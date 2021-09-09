import routeTypeEnum from './routeTypeEnum';
import RouteEnum from '../../enums/RouteEnum';

const editParams = (key: string, value: string) => ({
  type: routeTypeEnum.setCurrent,
  key,
  value,
});

const setCurrent = (current: keyof typeof RouteEnum) => ({
  type: routeTypeEnum.setCurrent,
  current,
});

const setParams = (params: { [name:string]: string | number }) => ({
  type: routeTypeEnum.setCurrent,
  params,
});

const reset = () => ({
  type: routeTypeEnum.reset,
});

const restoreState = (data) => ({
  type: routeTypeEnum.restoreState,
  data,
});

const appStateAction = {
  editParams,
  setCurrent,
  setParams,
  reset,
  restoreState,
};

export default appStateAction;
