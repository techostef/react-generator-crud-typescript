import { combineReducers } from 'redux';
import appState from './app/appState';
import confirmDialogState from './confirmDialog/confirmDialogState';
import routeState from './route/routeState';
import reagentsTestState from './suite/reagentsTest/reagentsTestState';
import IState from '../interfaces/IState';

type IRootState = {
  [key in keyof IState]: any;
}

const rootState: IRootState = {
  appState,
  confirmDialogState,
  routeState,
  reagentsTestState,
};

export default combineReducers(rootState as any);
