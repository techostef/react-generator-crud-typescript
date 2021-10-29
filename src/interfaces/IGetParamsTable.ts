interface IGetParamsTable<IStateContentData> {
  filters: Partial<IStateContentData>,
  hasPrevious: boolean,
  hasNext: boolean,
  orderBy: string,
  pageNumber: number,
  pageSize: number,
  searchTerm: string,
  totalItems: number,
}

export default IGetParamsTable;
