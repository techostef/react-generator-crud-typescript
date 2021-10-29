import RouteEnum from '../../enums/RouteEnum';
import IState from '../../interfaces/IState';
import appStateAction from '../app/appStateAction';
import routeStateAction from './routeStateAction';

const gotoReagentsTestEditor = () => (dispatch) => {
  dispatch(appStateAction.editPropertyStateByKey('isShowSidebar', false));
  dispatch(routeStateAction.setCurrent('reagentsTestEditor'));
};
const gotoReagentsTestManagement = () => (dispatch) => {
  dispatch(appStateAction.editPropertyStateByKey('isShowSidebar', false));
  dispatch(routeStateAction.setCurrent('reagentsTestManagement'));
};

const getCurrent = (): any => {
  return (dispatch, getState) => {
    const state: IState = getState();
    return state?.routeState?.toJS()?.current;
  };
};

const getLastPage = (): any => {
  return (dispatch, getState) => {
    const state: IState = getState();
    const history = state?.routeState?.toJS()?.history ?? [];
    return history[history.length - 2];
  };
};

export interface IRouteBusinessAction {
  getCurrent: () => keyof typeof RouteEnum,
  getLastPage: () => keyof typeof RouteEnum,
  gotoReagentsTestManagement: () => void,
  gotoReagentsTestEditor: () => void,
}

const routeBusinessAction: IRouteBusinessAction = {
  getCurrent,
  getLastPage,
  gotoReagentsTestEditor,
  gotoReagentsTestManagement,
};

export default routeBusinessAction;
