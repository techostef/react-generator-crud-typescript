import IAppState from './app/IAppState';
import IConfirmDialogState from './confirmDialog/IConfirmDialogState';
import IRouteState from './route/IRouteState';

interface IState {
  appState: IAppState,
  confirmDialogState: IConfirmDialogState,
  routeState: IRouteState,
}

export default IState;
