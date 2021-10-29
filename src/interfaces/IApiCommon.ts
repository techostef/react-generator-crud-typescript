import IPayload from './IPayload';

interface IApiCommon {
  getItems: (payload?: IPayload) => any;
  deleteItems: (payload: IPayload) => any,
  getGroups?: (payload?: IPayload) => any,
  getItem: (payload: IPayload) => any,
  postItem: (payload: IPayload) => any,
  putItem: (payload: IPayload) => any,
}

export default IApiCommon;
