import { batch } from 'react-redux';
import { AxiosResponse } from 'axios';
import { notification } from 'antd';
import RestHelper from './RestHelper';
import IStateActions from '../interfaces/IStateAction';
import IStateGeneral from '../interfaces/IStateGeneral';
import IGetParamsTable from '../interfaces/IGetParamsTable';
import TableBusiness from '../business/TableBusiness';
import IPayload from '../interfaces/IPayload';

const getXPagination = (response: AxiosResponse) => {
  const raw = (response?.headers && response?.headers['x-pagination']) ?? '';
  return JSON.parse(raw);
};

function getParamsOfFilterSearcGeneral<StateContentData>(
  stateContent: IGetParamsTable<StateContentData>,
) {
  const filters = TableBusiness.getFilters(stateContent.filters);
  return {
    ...filters,
    PageNumber: stateContent.pageNumber,
    PageSize: stateContent.pageSize,
    orderBy: stateContent.orderBy ?? '',
    searchTerm: stateContent.searchTerm ?? '',
  };
}

function handleSelectItemAndEditGeneral<IStateContent, IStateContentData>(
  index: number,
  stateContent: IStateGeneral<IStateContentData>,
  stateAction: Pick<IStateActions<IStateContent, any, any>, 'restoreSelectedItems' | 'editPropertyStateByKey'>,
  gotoEditor: () => void,
) {
  return async (dispatch) => {
    const newSelectedItems = [stateContent?.data[index]] ?? [];
    batch(() => {
      dispatch(stateAction.editPropertyStateByKey('indexSelectedItem' as any, 0));
      dispatch(stateAction.restoreSelectedItems(newSelectedItems));
      dispatch(gotoEditor());
    });
  };
}

function handleClearSearchAndFilterGeneral<IStateContent, IStateContentData>(
  stateContent: IStateGeneral<IStateContentData>,
  stateAction: Pick<IStateActions<IStateContent, any, any>, 'reset' | 'restoreData' | 'editPropertyStateByKey'>,
) {
  return async (dispatch) => {
    batch(() => {
      dispatch(stateAction.reset());
      dispatch(stateAction.restoreData(stateContent?.data));
      dispatch(stateAction.editPropertyStateByKey('selectedItems' as any, stateContent?.selectedItems));
    });
  };
}

function handleDeleteItemsGeneral<StateContentData>(
  messageSuccess: string,
  contentApi: { deleteItems:(data: IPayload) => Promise<AxiosResponse> },
  getFetchData: () => void,
  selectedItem: StateContentData[],
  stateAction: IStateActions<any, StateContentData, any>,
) {
  return async (dispatch) => {
    const ids = TableBusiness.getIds(selectedItem);
    dispatch(stateAction.editPropertyStateByKey('isLoadingTable', true));
    await contentApi.deleteItems({
      params: {
        ids,
      },
    }).then((response) => {
      RestHelper.handleResultRequest(response).then(() => {
        notification.success({
          message: 'Success',
          description: messageSuccess,
          placement: 'bottomRight',
        });
        dispatch(stateAction.editPropertyStateByKey('selectedItems', []));
      });
    });
    await dispatch(getFetchData());
    dispatch(stateAction.editPropertyStateByKey('isLoadingTable', false));
  };
}

function handleFetchDataGeneral<StateContentData>(
  response: AxiosResponse,
  stateAction: IStateActions<any, StateContentData, any>,
  handleDataBeToLocal?: (data: any) => StateContentData[],
) {
  return (dispatch) => {
    RestHelper.handleResultRequest(response).then((data) => {
      const xPagination = getXPagination(response);
      let newData = (data || []) as StateContentData[];
      if (typeof handleDataBeToLocal === 'function') {
        newData = handleDataBeToLocal(newData);
      }
      batch(() => {
        dispatch(stateAction.restoreData(newData));
        dispatch(stateAction.editPropertyStateByKey('totalItems', xPagination?.TotalCount ?? 0));
      });
    });
  };
}

const CrudHelper = {
  getXPagination,
  getParamsOfFilterSearcGeneral,
  handleClearSearchAndFilterGeneral,
  handleDeleteItemsGeneral,
  handleFetchDataGeneral,
  handleSelectItemAndEditGeneral,
};

export default CrudHelper;
