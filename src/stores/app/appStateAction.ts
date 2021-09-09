import IAppState from '../../interfaces/app/IAppState';
import AppViewMode from '../../enums/viewMode/AppViewMode';
import IAppStateData from '../../interfaces/app/IAppStateData';
import IEditItemByKeyApp from '../../interfaces/app/IEditItemByKeyApp';
import appTypeEnum from './appTypeEnum';

const editItemByKey = (
  params: IEditItemByKeyApp = { key: 'viewMode', value: '', Id: -1 },
) => ({
  type: appTypeEnum.editItemByKey,
  Id: params.Id,
  key: params.key,
  value: params.value,
});

const editPropertyStateByKey = (key: keyof IAppState, value) => ({
  type: appTypeEnum.editPropertyStateByKey,
  key,
  value,
});

const setViewMode = (
  viewMode: keyof typeof AppViewMode,
) => ({
  type: appTypeEnum.setViewMode,
  viewMode,
});

const restoreState = (state = {}) => ({
  type: appTypeEnum.restoreState, state,
});

const setItem = (Id: any, item: IAppStateData) => ({
  type: appTypeEnum.setItem, Id, item,
});

const appStateAction = {
  editItemByKey,
  editPropertyStateByKey,
  restoreState,
  setItem,
  setViewMode,
};

export default appStateAction;
