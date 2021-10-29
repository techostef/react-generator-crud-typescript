interface IBusinessAction<IStateContentData> {
  clearSearchAndFilter: () => void,
  createItem: (data: any, onSuccess?: () => void) => void,
  deleteItems: (selectedItem: IStateContentData[]) => void,
  getFetchItems: () => void,
  setIndexSelectedItemAndEdit: (index: number) => void,
  updateItem: (id, data: IStateContentData, onSuccess?: () => void) => void,
}

export default IBusinessAction;
