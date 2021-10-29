---
to: src/business/<%= instrumentName %>__test__/<%= pascalPageName %>Business.test.ts
---
import <%= pascalPageName %>Business from '../<%= pascalPageName %>Business';

describe('<%= pascalPageName %>Business', () => {
  it('test getItemById', async () => {
    let item: any = {};
    item = await <%= pascalPageName %>Business.getItemById(1);
    expect(item?.name).toBe('new Name');
  });
});
