import IAppState from './app/IAppState';
import IConfirmDialogState from './confirmDialog/IConfirmDialogState';
import IRouteState from './route/IRouteState';
import IReagentsTestState from './suite/reagentsTest/IReagentsTestState';

interface IState {
  appState: IAppState,
  confirmDialogState: IConfirmDialogState,
  routeState: IRouteState,
  reagentsTestState: IReagentsTestState,
}

export default IState;
