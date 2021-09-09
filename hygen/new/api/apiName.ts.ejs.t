---
to: <%= absPath %>/api/<%= instrumentName %>/<%= camelApiName %>/<%= pascalApiName %>Api.ts
---
import DefaultApi from '<%= path %>DefaultApi';
import IPayload from '../<%= path %>interfaces/IPayload';

const deleteItems = async (payload: IPayload) => {
  const url = '/api/<%= camelApiName %>';
  const res = await DefaultApi.deleteItems({ url, payload });
  return res;
};

const getItems = async (payload?: IPayload) => {
  const url = '/api/<%= camelApiName %>';
  const res = await DefaultApi.getItems({ url, payload });
  return res;
};

const getItem = async (payload?: IPayload) => {
  const url = `/api/<%= camelApiName %>/${payload?.id ?? -1}`;
  const res = await DefaultApi.getItems({ url, payload });
  return res;
};

const postItem = async (payload: IPayload) => {
  const url = '/api/<%= camelApiName %>';
  const res = await DefaultApi.postItem({ url, payload });
  return res;
};

const putItem = async (payload: IPayload) => {
  const url = `/api/<%= camelApiName %>/${(payload?.id ?? -1)}`;
  const res = await DefaultApi.putItem({ url, payload });
  return res;
};

const <%= pascalApiName %>Api = {
  deleteItems,
  getItems,
  getItem,
  postItem,
  putItem,
};

export default <%= pascalApiName %>Api;
