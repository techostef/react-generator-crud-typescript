interface IPayload {
  id?: number | string,
  data?: any, 
  params?: any, 
  filter?: string,
  ids?: any[],
}

export default IPayload;
