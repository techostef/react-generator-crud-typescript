import IPayload from '../interfaces/IPayload';
import config from '../config';
import HttpMethodEnum from '../enums/HttpMethodEnum';
import RestHelper from '../helper/RestHelper';

const BASE_URL = `${config.SERVICE_URL}`;

interface IGetItems {
  url: string,
  payload?: IPayload,
}

const getItems = async (info: IGetItems) => {
  const url = info?.payload?.filter ? `${info.url}?${info?.payload?.filter}` : info.url;
  const data = {
    method: HttpMethodEnum.GET,
    serviceUrl: BASE_URL,
    route: url,
    ...info.payload,
  };
  const result = await RestHelper.callApi(data as any);
  return result;
};

const deleteItems = async (info: IGetItems) => {
  const data = {
    method: HttpMethodEnum.DELETE,
    serviceUrl: BASE_URL,
    route: info.url,
    ...info?.payload,
  };
  const result = await RestHelper.callApi(data as any);
  return result;
};

const patchItem = async (info: IGetItems) => {
  const data = {
    method: HttpMethodEnum.PATCH,
    serviceUrl: BASE_URL,
    route: info.url,
    ...info?.payload,
  };
  const result = await RestHelper.callApi(data as any);
  return result;
};

const postItem = async (info: IGetItems) => {
  const data = {
    method: HttpMethodEnum.POST,
    serviceUrl: BASE_URL,
    route: info.url,
    ...info?.payload,
  };
  const result = await RestHelper.callApi(data as any);
  return result;
};

const putItem = async (info: IGetItems) => {
  const data = {
    method: HttpMethodEnum.PUT,
    serviceUrl: BASE_URL,
    route: info.url,
    ...info?.payload,
  };
  const result = await RestHelper.callApi(data as any);
  return result;
};

const DefaultApi = {
  deleteItems,
  getItems,
  patchItem,
  postItem,
  putItem,
};

export default DefaultApi;
