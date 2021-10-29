import { combineReducers } from 'redux';
import appState from './app/appState';
import confirmDialogState from './confirmDialog/confirmDialogState';
import routeState from './route/routeState';
import IState from '../interfaces/IState';

type IRootState = {
  [key in keyof IState]: any;
}

const rootState: IRootState = {
  appState,
  confirmDialogState,
  routeState,
};

export default combineReducers(rootState as any);
