// import * as Configs from './Configs';
// import * as Counter from './Counter';

// // The top-level state object
// export interface ApplicationState {
//   counter: Counter.CounterState | undefined;
//   configs: Configs.ConfigsState | undefined;
// }

// // acts on the corresponding ApplicationState property type.
// export const reducers = {
//   counter: Counter.reducer,
//   configs: Configs.reducer,
// };

// export interface AppThunkAction<TAction> {
//   (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
// }
import { combineReducers } from 'redux';
import appState from './app/appState';
import confirmDialogState from './confirmDialog/confirmDialogState';
import routeState from './route/routeState';

const rootState = {
  appState,
  confirmDialogState,
  routeState,
};

export default combineReducers(rootState as any);
