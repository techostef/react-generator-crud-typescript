---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/<%= camelStateName %>BusinessAction.ts
---
import { notification } from 'antd';
import <%= camelStateName %>StateAction from './<%= camelStateName %>StateAction';
import IState from '../<%= path %>interfaces/IState';
import I<%= pascalStateName %>StateData from '../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>StateData';
import RestHelper from '../<%= path %>helper/RestHelper';
import <%= pascalStateName %>Api from '../<%= path %>api/<%= instrumentName %><%= camelStateName %>/<%= pascalStateName %>Api';
import routeBusinessAction from '<%= path %>route/routeBusinessAction';
import IBusinessAction from '../<%= path %>interfaces/IBusinessAction';
import CrudHelper from '../<%= path %>helper/CrudHelper';
import I<%= pascalStateName %>State from '../<%= path %>interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State';

const setIndexSelectedItemAndEdit = (index: number) => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const <%= camelStateName %>State: I<%= pascalStateName %>State = state.<%= camelStateName %>State.toJS();
    dispatch(CrudHelper.handleSelectItemAndEditGeneral(
      index,
      <%= camelStateName %>State,
      <%= camelStateName %>StateAction,
      routeBusinessAction.goto<%= pascalStateName %>Editor,
    ));
  };
};

const clearSearchAndFilter = () => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const <%= camelStateName %>State: I<%= pascalStateName %>State = state.<%= camelStateName %>State.toJS();
    dispatch(CrudHelper.handleClearSearchAndFilterGeneral<
      I<%= pascalStateName %>State, I<%= pascalStateName %>StateData
    >(<%= camelStateName %>State, <%= camelStateName %>StateAction));
  };
};

const createItem = (data: I<%= pascalStateName %>StateData, onSuccess?: () => void) => {
  return async (dispatch) => {
    await <%= pascalStateName %>Api.postItem({ data }).then((response) => {
      RestHelper.handleResultRequest(response).then(() => {
        notification.success({
          message: 'Success',
          description: '<%= pascalStateName %> has been created',
          placement: 'bottomRight',
        });
        dispatch(routeBusinessAction.goto<%= pascalStateName %>Management());
        if (typeof onSuccess === 'function') onSuccess();
      });
    });
  };
};

const updateItem = (id, data: I<%= pascalStateName %>StateData, onSuccess?: () => void) => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const <%= camelStateName %>State = state?.<%= camelStateName %>State?.toJS();
    await <%= pascalStateName %>Api.putItem({ id, data }).then((response) => {
      RestHelper.handleResultRequest(response).then(() => {
        notification.success({
          message: 'Success',
          description: '<%= pascalStateName %> has been updated',
          placement: 'bottomRight',
        });
        if (<%= camelStateName %>State.selectedItems?.length === 1) {
          dispatch(routeBusinessAction.goto<%= pascalStateName %>Management());
        }
        if (typeof onSuccess === 'function') onSuccess();
      });
    });
  };
};

const getFetchItems = () => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const <%= camelStateName %>State = state.<%= camelStateName %>State.toJS();
    const params = CrudHelper.getParamsOfFilterSearcGeneral(<%= camelStateName %>State);
    await <%= pascalStateName %>Api.getItems({
      params,
    }).then((response) => {
      dispatch(CrudHelper.handleFetchDataGeneral(
        response,
        <%= camelStateName %>StateAction,
      ));
    });
  };
};

const deleteItems = (selectedItem: I<%= pascalStateName %>StateData[]) => {
  return async (dispatch) => {
    const messageSuccess = '<%= pascalStateName %> has been deleted';
    await dispatch(CrudHelper.handleDeleteItemsGeneral(
      messageSuccess,
      <%= pascalStateName %>Api,
      getFetchItems,
      selectedItem,
      <%= camelStateName %>StateAction,
    ));
  };
};

const <%= camelStateName %>BusinessAction: IBusinessAction<
I<%= pascalStateName %>StateData
> = {
  clearSearchAndFilter,
  createItem,
  deleteItems,
  getFetchItems,
  setIndexSelectedItemAndEdit,
  updateItem,
};

export default <%= camelStateName %>BusinessAction;
