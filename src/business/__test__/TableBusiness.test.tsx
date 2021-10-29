import _ from 'lodash';
import TableBusiness from '../TableBusiness';

describe('TableBusiness', () => {
  it('test getFilters', async () => {
    let data = {
      test: '123',
      test1: '123',
    };
    const resultData = {
      Test: '123',
      Test1: '123',
    };
    data = TableBusiness.getFilters(data);
    const isEqual = _.isEqual(data, resultData);
    expect(isEqual).toBe(true);
  });
  it('test getOrderBy', async () => {
    const data = {
      order: 'descend',
      columnKey: 'name',
    };
    const result1 = 'name desc';
    const string1 = TableBusiness.getOrderBy(data);
    expect(string1).toBe(result1);

    const result2 = '';
    const string2 = TableBusiness.getOrderBy({
      ...data,
      order: 'naskdfjas',
    });
    expect(string2).toBe(result2);

    const result3 = 'name asc';
    const string3 = TableBusiness.getOrderBy({
      ...data,
      order: 'ascend',
    });
    expect(string3).toBe(result3);
  });
  it('test getIds', async () => {
    const data = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    const result1 = [1, 2];
    const array1 = TableBusiness.getIds(data);
    const isEqual = _.isEqual(array1, result1);
    expect(isEqual).toBe(true);
  });
});
