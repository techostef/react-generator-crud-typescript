import IEditPropertyStateByKeyGeneral from './IEditPropertyStateByKeyGeneral';

interface IStateActions<IStateContent, IStateContentData, IEditItemByKey> {
  addItem: (item: IStateContentData) => ({
    type: string, item,
  }),
  editFilters: (key: keyof IStateContentData, value: string) => ({
    type: string,
    key,
    value,
  }),
  editItemByKey: (
    params: IEditItemByKey,
  ) => ({
    type: string,
    id: number,
    key: keyof IStateContentData,
    value: any,
  }),
  editPropertyStateByKey: IEditPropertyStateByKeyGeneral<IStateContentData>,
  removeItem: (id: any) => ({
    type: string, id,
  }),
  reset: () => ({
    type: string,
  }),
  restoreData: (data: IStateContentData[]) => ({
    type: string, data,
  }),
  restoreSelectedItems: (items: IStateContentData[]) => ({
    type: string, items,
  }),
  restoreState: (state: IStateContent) => ({
    type: string, state,
  }),
  setItem: (id: any, item: IStateContentData) => ({
    type: string, id, item,
  }),
}

export default IStateActions;
