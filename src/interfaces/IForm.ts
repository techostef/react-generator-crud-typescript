import React from 'react';

declare type InternalNamePath = (string | number)[];
declare type NamePath = string | number | InternalNamePath

declare interface Meta {
  touched: boolean;
  validating: boolean;
  errors: string[];
  name: InternalNamePath;
}

declare type Values<T> = Partial<{
  [key in keyof T]: T[key];
}>

interface InternalFieldData extends Meta {
  value: any;
}

interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
  name: NamePath;
}

declare type KeyOnly<T> = keyof T;

declare type ValidateFields<T = any> = (nameList?: KeyOnly<T>[]) => Promise<Values<T>>;

declare type IRef = {
  scrollToField: (name: NamePath, options?: any) => void;
  /** This is an internal usage. Do not use in your prod */
  __INTERNAL__: {
      /** No! Do not use this in your code! */
      name?: string;
      /** No! Do not use this in your code! */
      itemRef: (name: InternalNamePath) => (node: React.ReactElement) => void;
  };
  getFieldInstance: (name: NamePath) => any;
}

interface IForm<T> extends IRef {
  getFieldValue: (name: KeyOnly<T>) => any;
  getFieldsValue(): Values<T>;
  getFieldsValue(nameList: Values<T>[] | true, filterFunc?: (meta: Meta) => boolean): any;
  getFieldError: (name: KeyOnly<T>) => string[];
  getFieldsError: (nameList?: KeyOnly<T>[]) => any;
  isFieldsTouched(nameList?: KeyOnly<T>[], allFieldsTouched?: boolean): boolean;
  isFieldsTouched(allFieldsTouched?: boolean): boolean;
  isFieldTouched: (name: KeyOnly<T>) => boolean;
  isFieldValidating: (name: KeyOnly<T>) => boolean;
  isFieldsValidating: (nameList: KeyOnly<T>[]) => boolean;
  resetFields: (fields?: KeyOnly<T>[]) => void;
  setFields: (fields: FieldData[]) => void;
  setFieldsValue: (value: Values<T>) => void;
  validateFields: ValidateFields<T>;
  submit: () => void;
}

export default IForm;
