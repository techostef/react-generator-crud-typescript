import IAppState from '../../interfaces/app/IAppState';
import IAppStateData from '../../interfaces/app/IAppStateData';
import appTypeEnum from './appTypeEnum';

const editPropertyStateByKey = (key: keyof IAppState, value) => ({
  type: appTypeEnum.editPropertyStateByKey,
  key,
  value,
});

const restoreState = (state = {}) => ({
  type: appTypeEnum.restoreState, state,
});

const setItem = (Id: any, item: IAppStateData) => ({
  type: appTypeEnum.setItem, Id, item,
});

const appStateAction = {
  editPropertyStateByKey,
  restoreState,
  setItem,
};

export default appStateAction;
