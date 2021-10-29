import { useRef, useEffect, useState } from 'react';
import _ from 'lodash';

export function useEffectAfterMount(fn, deps) {
  const isFirst = useRef(true);
  useEffect(() => {
    if (!isFirst.current) {
      fn();
    }

    isFirst.current = false;
  }, deps);
}

export function useDeepEffect(fn, deps) {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);
  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) => _.isEqual(obj, deps[index]));

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
}

export type IClassHighlight<T> = Partial<{
  [key in keyof T]: string;
}>

export interface IUseChangeHighlight<T> {
  classHighlight: IClassHighlight<T>,
  dataOld: T,
  isEdit: boolean,
  setValue: (item: any) => void,
  resetValue: () => void,
  restoreData: (newDataLocal: T) => void,
}

export function useChangeHighlight<T>(
  newData?: any,
  isAdd = false,
): IUseChangeHighlight<T> {
  const [dataOld, setDataOld] = useState<T>(newData);
  const [dataNew, setDataNew] = useState<Partial<T>>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [classHighlight, setClassHighlight] = useState<IClassHighlight<T>>({});
  const [isAddLocal] = useState<boolean>(isAdd);

  const setValue = (item: any) => {
    const ok = Object.keys(item);
    setDataNew({
      ...dataNew,
      ...item,
    });
    const tempClass = { ...classHighlight };
    const key: keyof T = ok[0] as any;
    const className = getClassHighlight(key, item[key]);
    if (className === '') {
      delete tempClass[key];
    } else {
      tempClass[key] = className;
    }
    updateIsEdit(tempClass);
    setClassHighlight(tempClass);
  };

  const updateIsEdit = (data: any) => {
    setIsEdit(Object.keys(data).length > 0);
  };

  const resetValue = () => {
    setDataNew({});
    setClassHighlight({});
    updateIsEdit({});
  };

  const getIsSame = (key: keyof T, value?: any): boolean => {
    if (isAddLocal) return true;
    if (typeof value === 'undefined') {
      if (dataNew && typeof dataNew[key] !== 'undefined') return dataOld && _.isEqual(dataOld[key], dataNew[key]);
      return true;
    }
    if (dataOld && dataOld[key] === null && value === '') return true;
    return dataOld && _.isEqual(dataOld[key], value);
  };

  const getClassHighlight = (key: keyof T, value?: any) => {
    const result = getIsSame(key, value);
    if (!result) return 'highlight-border';
    return '';
  };

  const restoreData = (newDataLocal: T) => {
    setDataOld(newDataLocal);
    resetValue();
  };

  return {
    classHighlight,
    dataOld,
    isEdit,
    setValue,
    resetValue,
    restoreData,
  };
}

export function useLoadMore(
  fn: (() => void),
  element: EventTarget & HTMLElement,
  deps: any[],
) {
  useDeepEffect(() => {
    const listener = () => {
      const scrollBottom = element?.scrollTop + element?.clientHeight;
      if (scrollBottom >= element?.scrollHeight) {
        if (typeof fn === 'function') {
          fn();
          element?.removeEventListener('scroll', listener);
        }
      }
    };
    element?.addEventListener('scroll', listener);
  }, [deps, element]);
}
