/* eslint-disable no-unneeded-ternary */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../../index';
import appStateAction from '../appStateAction';
import IState from '../../../interfaces/IState';

describe('AppStateAction Change', () => {
  it('test setViewMode', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    const viewMode = state.appState.toJS()?.viewMode;
    expect('Home').toBe(viewMode);
    dispatch(appStateAction.setViewMode('Configs') as any);
    state = getState() as IState;
    expect('Configs').toBe(state.appState.toJS().viewMode);
  });
});
