---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/<%= camelStateName %>StateAction.ts
---
import I<%= pascalStateName %>State from '../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State';
import I<%= pascalStateName %>StateData from '../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>StateData';
import IEditItemByKey<%= pascalStateName %> from '../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/IEditItemByKey<%= pascalStateName %>';
import <%= camelStateName %>TypeEnum from './<%= camelStateName %>TypeEnum';

const addItem = (item: I<%= pascalStateName %>StateData) => ({
  type: <%= camelStateName %>TypeEnum.addItem, item,
});

const editFilters = (key: keyof I<%= pascalStateName %>StateData, value: string) => ({
  type: <%= camelStateName %>TypeEnum.editFilters,
  key,
  value,
});

const editItemByKey = (
  params: IEditItemByKey<%= pascalStateName %> = { key: 'id', value: '', id: -1 },
) => ({
  type: <%= camelStateName %>TypeEnum.editItemByKey,
  id: params.id,
  key: params.key,
  value: params.value,
});

const editPropertyStateByKey = (key: keyof I<%= pascalStateName %>State, value) => ({
  type: <%= camelStateName %>TypeEnum.editPropertyStateByKey,
  key,
  value,
});

const removeItem = (id: any) => ({
  type: <%= camelStateName %>TypeEnum.removeItem, id,
});

const reset = () => ({
  type: <%= camelStateName %>TypeEnum.reset,
});

const restoreData = (data: I<%= pascalStateName %>StateData[]) => ({
  type: <%= camelStateName %>TypeEnum.restoreData, data,
});

const restoreState = (state: I<%= pascalStateName %>State) => ({
  type: <%= camelStateName %>TypeEnum.restoreState, state,
});

const restoreSelectedItems = (items: I<%= pascalStateName %>StateData[]) => ({
  type: <%= camelStateName %>TypeEnum.restoreSelectedItems, items,
});

const setItem = (id: any, item: I<%= pascalStateName %>StateData) => ({
  type: <%= camelStateName %>TypeEnum.setItem, id, item,
});

const <%= camelStateName %>StateAction = {
  addItem,
  editFilters,
  editItemByKey,
  editPropertyStateByKey,
  removeItem,
  reset,
  restoreData,
  restoreSelectedItems,
  restoreState,
  setItem,
};

export default <%= camelStateName %>StateAction;
