import StringHelper from '../helper/StringHelper';

const getFilters = (filters: any) => {
  if (typeof filters !== 'object') return {};
  const result: any = {};
  const keys = Object.keys(filters);
  keys.forEach((item) => {
    const pascalCaseItem = StringHelper.capitalizeFirstLetter(item);
    result[pascalCaseItem] = filters[item];
  });

  return result;
};

const getOrderBy = (sorter: any) => {
  let sortOrder = sorter.order;
  const orderBy = ((sortOrder === 'descend' || sortOrder === 'ascend') ? sorter.columnKey : '');
  if (orderBy.length === 0) return '';
  if (sortOrder === 'descend') sortOrder = 'desc';
  else sortOrder = 'asc';

  return `${orderBy} ${sortOrder}`;
};

const getIds = (data: any[]) => {
  const ids: any[] = [];
  data.forEach((item) => {
    if (item.id) ids.push(item.id);
    else if (item?.Id) ids.push(item.Id);
  });

  return ids;
};

const TableBusiness = {
  getFilters,
  getIds,
  getOrderBy,
};

export default TableBusiness;
