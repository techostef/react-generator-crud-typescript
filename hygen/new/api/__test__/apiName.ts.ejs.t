---
to: <%= absPath %>/api/<%= instrumentName %>/<%= camelApiName %>/__test__/<%= pascalApiName %>Api.test.ts
---
/* eslint-disable no-unneeded-ternary */
import <%= pascalApiName %>Api from '../<%= pascalApiName %>Api';

describe('<%= pascalApiName %> Api', () => {
  it('get items', async () => {
    let data = [];
    await <%= pascalApiName %>Api.getItems().then((res: any) => {
      data = res?.data;
    });
    expect(data.length).toBe(4);
  });
  it('post item', async () => {
    let item: any = {};
    await <%= pascalApiName %>Api.postItem({
      data: {
        name: 'Chocolate',
      }
    }).then((res: any) => {
      item = res?.data;
    });
    expect(item?.name).toBe('Chocolate');
  });
  it('put item', async () => {
    let item: any = {};
    await <%= pascalApiName %>Api.putItem({
      data: {
        name: 'Chocolate',
      }
    }).then((res: any) => {
      item = res?.data;
    });
    expect(item?.name).toBe('Chocolate');
  });
  it('delete item', async () => {
    let data = [];
    await <%= pascalApiName %>Api.deleteItems({
      ids: ['Vanilla 2']
    }).then((res: any) => {
      data = res?.data;
    });
    expect(data.length).toBe(3);
  });
});
