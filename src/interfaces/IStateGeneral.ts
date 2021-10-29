import IGetParamsTable from './IGetParamsTable';

declare type IStateGeneral<IStateContentData> = {
  data: IStateContentData[],
  disabledRowId: number[],
  indexSelectedItem: number | undefined,
  isLoadingTable: boolean,
  isLoadingForm: boolean,
  isSelectionOption: boolean,
  selectedItems: IStateContentData[],
  toJS: any,
} & IGetParamsTable<IStateContentData>;

export default IStateGeneral;
