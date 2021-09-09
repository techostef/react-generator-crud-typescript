---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/<%= camelStateName %>State.ts
---
import { Map } from 'immutable';
import I<%= pascalStateName %>State from '../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State';
import I<%= pascalStateName %>StateData from '../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>StateData';
import <%= camelStateName %>TypeEnum from './<%= camelStateName %>TypeEnum';

const initData: I<%= pascalStateName %>State = {
  data: [],
  filters: {},
  hasPrevious: false,
  hasNext: false,
  indexSelectedItem: undefined,
  isLoadingTable: false,
  isSelectionOption: false,
  orderBy: '',
  pageNumber: 1,
  pageSize: 15,
  searchTerm: '',
  selectedItems: [],
  toJS: undefined as any,
  totalItems: 0,
};

const init = Map(initData as any);

const <%= camelStateName %>State = (state = init, action: any) => {
  let index;
  let newState: any;
  let newData: any;
  switch (action.type) {
    case <%= camelStateName %>TypeEnum.addItem:
      newState = state.toJS() as unknown as I<%= pascalStateName %>State;
      return Map({
        ...newState,
        data: [...newState.data, action.item],
      });

    case <%= camelStateName %>TypeEnum.editFilters:
      newState = state.toJS() as unknown as I<%= pascalStateName %>State;
      newState.filters[action.key] = action.value;

      return Map({
        ...newState,
      });

    case <%= camelStateName %>TypeEnum.editItemByKey:
      newState = state.toJS() as unknown as I<%= pascalStateName %>State;
      index = newState.data.findIndex((item: I<%= pascalStateName %>StateData) => item.id === action.id);
      if (index === -1) return state;

      const key = action.key as keyof I<%= pascalStateName %>StateData;
      newState.data[index][key] = action.value;
      return Map({
        ...newState,
        data: [...newState.data],
      });

    case <%= camelStateName %>TypeEnum.removeItem:
      newState = state.toJS() as unknown as I<%= pascalStateName %>State;
      newData = newState.data.filter((item: I<%= pascalStateName %>StateData) => item.id !== action.id);

      return Map({
        ...newState,
        data: [...newData],
      });

    case <%= camelStateName %>TypeEnum.reset:
      return init;

    case <%= camelStateName %>TypeEnum.restoreData:
      return Map({
        ...state.toJS(),
        data: action.data,
        selectedItems: [],
      });

    case <%= camelStateName %>TypeEnum.restoreSelectedItems:
      return Map({
        ...state.toJS(),
        selectedItems: action.items,
      });

    case <%= camelStateName %>TypeEnum.restoreState:
      return Map(action.state);

    case <%= camelStateName %>TypeEnum.setItem:
      newState = state.toJS() as unknown as I<%= pascalStateName %>State;
      index = newState.data.findIndex((item: I<%= pascalStateName %>StateData) => item.id === action.id);
      if (index === -1) return state;

      newState.data[index] = action.item;
      return Map({
        ...newState,
        data: [...newState.data],
      });

    case <%= camelStateName %>TypeEnum.setPageSize:
      newState = state.toJS() as unknown as I<%= pascalStateName %>State;
      return Map({
        ...newState,
        pageSize: action.pageSize,
      });

    case <%= camelStateName %>TypeEnum.setTotalItems:
      newState = state.toJS() as unknown as I<%= pascalStateName %>State;
      return Map({
        ...newState,
        totalItems: action.totalItems,
      });

    case <%= camelStateName %>TypeEnum.editPropertyStateByKey:
      newState = state.toJS() as unknown as I<%= pascalStateName %>State;
      newState[action.key] = action.value;
      return Map({
        ...newState,
      });

    default:
      return state;
  }
};

export default <%= camelStateName %>State;
