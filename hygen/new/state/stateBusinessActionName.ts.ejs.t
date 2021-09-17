---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/<%= camelStateName %>BusinessAction.ts
---
import { batch } from 'react-redux';
import <%= camelStateName %>StateAction from './<%= camelStateName %>StateAction';
import IState from '../<%= path %>interfaces/IState';
import I<%= pascalStateName %>StateData from '../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>StateData';
import actionHelper from '../<%= path %>helper/ActionHelper';
import RestHelper from '../<%= path %>helper/RestHelper';
import <%= pascalStateName %>Api from '../<%= path %>api/<%= instrumentName %><%= camelStateName %>/<%= pascalStateName %>Api';
import TableBusiness from '../<%= path %>business/TableBusiness';

const {
  selectOnMulti,
} = actionHelper;

const setSelectedAll = (
  isSelected = false,
) => (dispatch: any, getState: any) => {
  const state = getState();
  const { <%= camelStateName %>State } = state;
  const newData = <%= camelStateName %>State
    .toJS()
    .data
    .map((item: I<%= pascalStateName %>StateData) => ({ ...item, isSelected }));

  dispatch(<%= camelStateName %>StateAction.restoreData(newData));
};

const setSelectedItem = (
  id = -1,
  isSelected: boolean = false,
  isMultiple: boolean = false,
) => (dispatch: any) => {
  const unSelectAll = () => dispatch(setSelectedAll(false));
  const selectItem = () => dispatch(<%= camelStateName %>StateAction.editItemByKey({
    id,
    key: 'isSelected',
    value: isSelected,
  }));
  selectOnMulti(isMultiple, selectItem, unSelectAll);
};

const dataCopyToSelectedItems = () => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const <%= camelStateName %>State = state.<%= camelStateName %>State.toJS();
    dispatch(<%= camelStateName %>StateAction.restoreSelectedItems(<%= camelStateName %>State.data));
  };
};

const selectedItemsCopyToData = () => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const <%= camelStateName %>State = state.<%= camelStateName %>State.toJS();
    dispatch(<%= camelStateName %>StateAction.restoreSelectedItems(<%= camelStateName %>State.data));
  };
};

const clearSearchAndFilter = () => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const <%= camelStateName %>State: any = state.<%= camelStateName %>State.toJS();
    batch(() => {
      dispatch(<%= camelStateName %>StateAction.reset());
      dispatch(<%= camelStateName %>StateAction.restoreState({
        ...<%= camelStateName %>State,
        data: [...<%= camelStateName %>State?.data],
      }));
    });
  };
};

const getFetchData = () => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const <%= camelStateName %>State = state.<%= camelStateName %>State.toJS();
    const filters = TableBusiness.getFilters(<%= camelStateName %>State.filters);
    const params = {
      ...filters,
      PageNumber: <%= camelStateName %>State.pageNumber,
      PageSize: <%= camelStateName %>State.pageSize,
      orderBy: <%= camelStateName %>State.orderBy ?? '',
      searchTerm: <%= camelStateName %>State.searchTerm ?? '',
    };
    await <%= pascalStateName %>Api.getItems({
      params,
    }).then((response) => {
      RestHelper.handleResultRequest(response).then((data) => {
        const raw = (response?.headers && response?.headers['x-pagination']) ?? '';
        const xPagination = JSON.parse(raw);
        const newData = (data || []) as I<%= pascalStateName %>StateData[];
        const indexSelectedItem = (newData.length > 0 ? 0 : undefined);
        dispatch(<%= camelStateName %>StateAction.restoreState({
          ...<%= camelStateName %>State,
          indexSelectedItem,
          data: newData,
          selectedItems: newData,
          totalItems: (xPagination?.TotalCount ?? 0),
          hasPrevious: (xPagination?.HasPrevious ?? false),
          hasNext: (xPagination?.HasNext ?? false),
          toJS: undefined as any,
        }));
      });
    });
  };
};

const deleteItems = (selectedItem: I<%= pascalStateName %>StateData[]) => {
  return async (dispatch) => {
    const ids = TableBusiness.getIds(selectedItem);
    await <%= pascalStateName %>Api.deleteItems({
      params: {
        ids,
      },
    }).then((response) => {
      RestHelper.handleResultRequest(response);
    });
    await batch(async () => {
      dispatch(<%= camelStateName %>StateAction.editPropertyStateByKey('isLoadingTable', true));
      await dispatch(getFetchData());
      dispatch(<%= camelStateName %>StateAction.editPropertyStateByKey('isLoadingTable', false));
    });
  };
};

const <%= camelStateName %>BusinessAction = {
  clearSearchAndFilter,
  dataCopyToSelectedItems,
  deleteItems,
  getFetchData,
  selectedItemsCopyToData,
  setSelectedAll,
  setSelectedItem,
};

export default <%= camelStateName %>BusinessAction;
