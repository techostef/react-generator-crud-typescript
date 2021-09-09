import { Map } from 'immutable';
import IAppState from '../../interfaces/app/IAppState';
import IAppStateData from '../../interfaces/app/IAppStateData';
import appTypeEnum from './appTypeEnum';

const initData: IAppState = {
  isShowSidebar: true,
  toJS: undefined as any,
};

const init = Map(initData as any);

const appState = (state = init, action: any) => {
  let key;
  let newState: any;
  switch (action.type) {
    case appTypeEnum.editItemByKey:
      newState = state.toJS() as unknown as IAppState;

      key = action.key as keyof IAppStateData;
      newState.data[key] = action.value;
      return Map({
        ...newState,
        data: [...newState.data],
        selectedItems: [],
      });

    case appTypeEnum.editPropertyStateByKey:
      newState = state.toJS() as unknown as IAppState;

      key = action.key as keyof IAppStateData;
      newState[key] = action.value;
      return Map(newState);

    case appTypeEnum.setViewMode:
      newState = { ...state.toJS() };
      return Map({
        ...newState,
        viewMode: action.viewMode,
      });

    case appTypeEnum.reset:
      return init;

    case appTypeEnum.restoreState:
      return Map(action.data);

    default:
      return state;
  }
};

export default appState;
