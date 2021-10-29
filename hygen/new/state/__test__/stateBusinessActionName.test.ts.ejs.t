---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/__test__/<%= pascalStateName %>BusinessAction.test.ts
---
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../<%= path %>index';
import I<%= pascalStateName %>State from '../../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State';
import I<%= pascalStateName %>StateData from '../../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>StateData';
import <%= camelStateName %>StateAction from '../<%= camelStateName %>StateAction';
import <%= camelStateName %>BusinessAction from '../<%= camelStateName %>BusinessAction';
import UnitTestBusiness from '../../<%= path %>business/UnitTestBusiness';
import routeBusinessAction from '../<%= path %>route/routeBusinessAction';
import RouteEnum from '../../<%= path %>enums/RouteEnum';

const { getState: getStateContent } = UnitTestBusiness;

const getState = (store): I<%= pascalStateName %>State => {
  return getStateContent<I<%= pascalStateName %>State>(store, '<%= camelStateName %>State');
};

const dummyItem: I<%= pascalStateName %>StateData = {
  id: 1,
  name: '',
};

describe('<%= pascalStateName %>BusinessAction', () => {
  it('test setIndexSelectedItemAndEdit', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).indexSelectedItem).toBe(undefined);
    dispatch(<%= camelStateName %>BusinessAction.setIndexSelectedItemAndEdit(0) as any);
    expect(getState(store).indexSelectedItem).toBe(0);
  });

  it('test clearSearchAndFilter', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).totalItems).toBe(0);
    expect(getState(store).data.length).toBe(0);
    dispatch(<%= camelStateName %>StateAction.editPropertyStateByKey('totalItems', 1));
    dispatch(<%= camelStateName %>StateAction.editPropertyStateByKey('data', [dummyItem]));
    expect(getState(store).totalItems).toBe(1);
    expect(getState(store).data.length).toBe(1);
    dispatch(<%= camelStateName %>BusinessAction.clearSearchAndFilter() as any);
    expect(getState(store).totalItems).toBe(0);
    expect(getState(store).data.length).toBe(1);
  });

  it('test getFetchItems ', async () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).data.length).toBe(0);
    await dispatch(<%= camelStateName %>BusinessAction.getFetchItems() as any);
    expect(getState(store).data.length).toBe(4);
  });

  it('test createItem', async () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    let val = 0;
    expect(dispatch(routeBusinessAction.getCurrent() as any))
      .toBe(RouteEnum.home);
    await dispatch(<%= camelStateName %>BusinessAction.createItem(dummyItem) as any);
    expect(dispatch(routeBusinessAction.getCurrent() as any))
      .toBe(RouteEnum.<%= camelStateName %>Management);
    await dispatch(<%= camelStateName %>BusinessAction.createItem(dummyItem, () => {
      val = 1;
    }) as any);
    expect(val).toBe(1);
  });

  it('test updateItem', async () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    let val = 0;
    expect(dispatch(routeBusinessAction.getCurrent() as any))
      .toBe(RouteEnum.home);
    dispatch(<%= camelStateName %>StateAction.editPropertyStateByKey('selectedItems', [dummyItem]) as any);
    expect(getState(store).selectedItems.length).toBe(1);
    await dispatch(<%= camelStateName %>BusinessAction.updateItem(1, dummyItem) as any);
    expect(getState(store).selectedItems.length).toBe(1);
    expect(dispatch(routeBusinessAction.getCurrent() as any))
      .toBe(RouteEnum.<%= camelStateName %>Management);

    await dispatch(<%= camelStateName %>BusinessAction.updateItem(1, dummyItem, () => {
      val = 1;
    }) as any);
    expect(val).toBe(1);
  });

  it('test deleteItem', async () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    await dispatch(<%= camelStateName %>StateAction.editPropertyStateByKey('selectedItems', [dummyItem]) as any);
    await dispatch(<%= camelStateName %>BusinessAction.deleteItems([dummyItem]) as any);
    expect(getState(store).selectedItems.length).toBe(0);
  });
});
