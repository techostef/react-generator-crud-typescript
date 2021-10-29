interface IReturn {
  type: string,
  key,
  value,
}

export interface IEditPropertyStateFilterOnly<IStateContentData> {
  (key: 'filters', value: Partial<IStateContentData>): IReturn,
  (key: 'hasPrevious', value: boolean): IReturn
  (key: 'hasNext', value: boolean): IReturn
  (key: 'orderBy', value: string): IReturn
  (key: 'pageNumber', value: number): IReturn
  (key: 'pageSize', value: number): IReturn
  (key: 'searchTerm', value: string): IReturn
  (key: 'totalItems', value: number): IReturn
}

export interface IEditPropertyStateGeneralOnly<IStateContentData> {
  (key: 'data', value: IStateContentData[]): IReturn,
  (key: 'disabledRowId', value: number[]): IReturn,
  (key: 'indexSelectedItem', value: number | undefined): IReturn
  (key: 'isLoadingTable', value: boolean): IReturn
  (key: 'isLoadingForm', value: boolean): IReturn
  (key: 'isSelectionOption', value: boolean): IReturn
  (key: 'selectedItems', value: IStateContentData[]): IReturn
  (key: 'test'): IReturn
}

type IEditPropertyStateByKeyGeneral<IStateContentData> = (
  IEditPropertyStateGeneralOnly<IStateContentData> &
  IEditPropertyStateFilterOnly<IStateContentData>
)

export default IEditPropertyStateByKeyGeneral;
