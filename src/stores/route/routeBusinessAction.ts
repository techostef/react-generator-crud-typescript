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

const getCurrent = () => {
  return (dispatch, getState) => {
    const state: IState = getState();
    return state?.routeState?.toJS()?.current;
  };
};

const getLastPage = () => {
  return (dispatch, getState) => {
    const state: IState = getState();
    const history = state?.routeState?.toJS()?.history ?? [];
    return history[history.length - 2];
  };
};

const routeBusinessAction = {
  getCurrent,
  getLastPage,
  gotoReagentsTestEditor,
  gotoReagentsTestManagement,
};

export default routeBusinessAction;
