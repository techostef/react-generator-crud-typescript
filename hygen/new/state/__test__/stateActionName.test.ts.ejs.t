---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/__test__/<%= camelStateName %>StateAction.test.ts
---
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../<%= path %>index';
import I<%= pascalStateName %>State from '../../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State';
import I<%= pascalStateName %>StateData from '../../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>StateData';
import <%= camelStateName %>StateAction from '../<%= camelStateName %>StateAction';
import UnitTestBusiness from '../../<%= path %>business/UnitTestBusiness';

const { getState: getStateContent } = UnitTestBusiness;

const getState = (store): I<%= pascalStateName %>State => {
  return getStateContent<I<%= pascalStateName %>State>(store, '<%= camelStateName %>State');
};

const dummyItem: I<%= pascalStateName %>StateData = {
  id: 1,
  name: '',
};

describe('<%= camelStateName %>StateAction Change', () => {
  it('test add item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.addItem(dummyItem) as any);
    expect(getState(store).data.length).toBe(1);
  });

  it('test edit item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    const name = 'test name';
    const nameOther = 'test name other';
    dispatch(<%= camelStateName %>StateAction.addItem(dummyItem) as any);
    dispatch(<%= camelStateName %>StateAction.editItemByKey({ id: 1, key: 'name', value: name }) as any);
    expect(getState(store).data[0].name).toBe(name);
    dispatch(<%= camelStateName %>StateAction.editItemByKey({ id: -1, key: 'name', value: nameOther }) as any);
    expect(getState(store).data[0].name).toBe(name);
  });

  it('test remove item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.addItem(dummyItem));
    expect(getState(store).data.length).toBe(1);

    dispatch(<%= camelStateName %>StateAction.removeItem(1) as any);
    expect(getState(store).data.length).toBe(0);
  });

  it('test set item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    const name = 'test name';
    const nameOther = 'test name other';
    dispatch(<%= camelStateName %>StateAction.addItem(dummyItem) as any);
    dispatch(<%= camelStateName %>StateAction.setItem(1, {
      ...dummyItem,
      name,
    }) as any);
    expect(getState(store).data[0].name).toBe(name);
    dispatch(<%= camelStateName %>StateAction.setItem(-1, {
      ...dummyItem,
      name: nameOther,
    }) as any);
    expect(getState(store).data[0].name).toBe(name);
  });

  it('test restore data', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.restoreData([dummyItem]) as any);
    expect(getState(store).data.length).toBe(1);
  });

  it('test edit property state', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).isLoadingTable).toBe(false);

    dispatch(<%= camelStateName %>StateAction.editPropertyStateByKey('isLoadingTable', true));
    expect(getState(store).isLoadingTable).toBe(true);
  });

  it('test editFilters', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    dispatch(<%= camelStateName %>StateAction.editFilters('name', 'a'));
    expect(getState(store).filters.name).toBe('a');
  });

  it('test restoreSelectedItems', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).selectedItems.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.restoreSelectedItems([dummyItem]));
    expect(getState(store).selectedItems.length).toBe(1);
  });

  it('test restoreState', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    const newState = getState(store);
    expect(getState(store).totalItems).toBe(0);
    dispatch(<%= camelStateName %>StateAction.restoreState({
      ...newState,
      totalItems: 1,
    }));
    expect(getState(store).totalItems).toBe(1);
  });

  it('test restore reset', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).totalItems).toBe(0);
    dispatch(<%= camelStateName %>StateAction.editPropertyStateByKey('totalItems', 1));
    expect(getState(store).totalItems).toBe(1);
    dispatch(<%= camelStateName %>StateAction.reset());
    expect(getState(store).totalItems).toBe(0);
  });
});
