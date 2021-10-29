---
to: <%= absPath %>/api/<%= instrumentName %>/<%= camelApiName %>/__test__/<%= pascalApiName %>Api.test.ts
---
import <%= pascalApiName %>Api from '../<%= pascalApiName %>Api';

describe('<%= pascalApiName %> Api', () => {
  it('get items', async () => {
    let data = [];
    await <%= pascalApiName %>Api.getItems().then((res: any) => {
      data = res?.data;
    });
    expect(data?.length).toBe(4);
  });
  it('get item', async () => {
    let item: any = {};
    await <%= pascalApiName %>Api.getItem({ id: 1 }).then((res: any) => {
      item = res?.data;
    });
    expect(item?.name).toBe('new Name');
  });
  it('post item', async () => {
    let item: any = {};
    await <%= pascalApiName %>Api.postItem({
      data: {
        name: 'new Name',
      },
    }).then((res: any) => {
      item = res?.data;
    });
    expect(item?.name).toBe('new Name');
  });
  it('put item', async () => {
    let item: any = {};
    await <%= pascalApiName %>Api.putItem({
      data: {
        name: 'new Name',
      },
    }).then((res: any) => {
      item = res?.data;
    });
    expect(item?.name).toBe('new Name');
  });
  it('delete item', async () => {
    let data = [];
    await <%= pascalApiName %>Api.deleteItems({
      ids: ['Vanilla 2'],
    }).then((res: any) => {
      data = res?.data;
    });
    expect(data?.length).toBe(3);
  });
});
