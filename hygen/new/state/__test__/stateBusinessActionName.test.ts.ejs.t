---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/__test__/<%= pascalStateName %>BusinessAction.test.ts
---
/* eslint-disable no-unneeded-ternary */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../<%= path %>index';
import IState from '../../<%= path %>interfaces/IState';
import I<%= pascalStateName %>State from '../../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State';
import <%= camelStateName %>StateAction from '../<%= camelStateName %>StateAction';
import <%= camelStateName %>BusinessAction from '../<%= camelStateName %>BusinessAction';

describe('<%= pascalStateName %>BusinessAction test', () => {
  it('test set selected all', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let <%= camelStateName %>State: I<%= pascalStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.restoreData([
      {
        Id: 1,
        Name: '123',
        isSelected: false,
      },
      {
        Id: 2,
        Name: '2233',
        isSelected: false,
      },
    ]) as any);
    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data[0].isSelected).toBe(false);
    expect(<%= camelStateName %>State.data[1].isSelected).toBe(false);
    dispatch(<%= camelStateName %>BusinessAction.setSelectedAll(true) as any);

    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data[0].isSelected).toBe(true);
    expect(<%= camelStateName %>State.data[1].isSelected).toBe(true);
  });

  it('test set selected item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let <%= camelStateName %>State: I<%= pascalStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.restoreData([
      {
        Id: 1,
        Name: '123',
        isSelected: false,
      },
      {
        Id: 2,
        Name: '2233',
        isSelected: false,
      },
    ]) as any);
    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data[0].isSelected).toBe(false);
    expect(<%= camelStateName %>State.data[1].isSelected).toBe(false);
    dispatch(<%= camelStateName %>BusinessAction.setSelectedItem(1, true, true) as any);

    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data[0].isSelected).toBe(true);
    expect(<%= camelStateName %>State.data[1].isSelected).toBe(false);
  });
});
