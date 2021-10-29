interface IFilter {
  text: string,
  value: string,
}

interface IColumnTable {
  title: string,
  dataIndex: string,
  key: string,
  isSearch?: boolean,
  isSort?: boolean,
  filterMultiple?: boolean,
  filters?: IFilter[],
}

export default IColumnTable;
