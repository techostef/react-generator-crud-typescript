---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/__test__/<%= pascalStateName %>StateAction.test.ts
---
/* eslint-disable no-unneeded-ternary */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../<%= path %>index';
import IState from '../../<%= path %>interfaces/IState';
import I<%= pascalStateName %>State from '../../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State';
import <%= camelStateName %>StateAction from '../<%= camelStateName %>StateAction';

describe('<%= pascalStateName %>StateAction Change', () => {
  it('test add item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let <%= camelStateName %>State: I<%= pascalStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.addItem({
      id: 1,
      name: '123',
      isSelected: false,
    }) as any);
    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(1);
  });

  it('test edit item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let <%= camelStateName %>State: I<%= pascalStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    const name = 'test name';
    dispatch(<%= camelStateName %>StateAction.addItem({
      id: 1,
      name: '123',
      isSelected: false,
    }) as any);
    dispatch(<%= camelStateName %>StateAction.editItemByKey({ id: 1, key: 'name', value: name }) as any);
    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data[0].name).toBe(name);
  });

  it('test remove item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let <%= camelStateName %>State: I<%= pascalStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.addItem({
      id: 1,
      name: '123',
      isSelected: false,
    }));
    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(1);

    dispatch(<%= camelStateName %>StateAction.removeItem(1) as any);
    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(0);
  });

  it('test set item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let <%= camelStateName %>State: I<%= pascalStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    const name = 'test name';
    dispatch(<%= camelStateName %>StateAction.addItem({
      id: 1,
      name: '123',
      isSelected: false,
    }) as any);
    dispatch(<%= camelStateName %>StateAction.setItem(1, {
      id: 1,
      name,
      isSelected: false,
    }) as any);
    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data[0].name).toBe(name);
  });

  it('test restore data', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let <%= camelStateName %>State: I<%= pascalStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.restoreData([{
      id: 1,
      name: '123',
      isSelected: false,
    }]) as any);
    state = getState() as IState;
    <%= camelStateName %>State = state?.<%= camelStateName %>State.toJS() as I<%= pascalStateName %>State;
    expect(<%= camelStateName %>State.data.length).toBe(1);
  });
});
