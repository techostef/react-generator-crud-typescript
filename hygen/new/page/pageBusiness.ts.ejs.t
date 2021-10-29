---
to: src/business/<%= instrumentName %><%= pascalPageName %>Business.ts
---
import <%= pascalPageName %>Api from '<%= path %>api/<%= instrumentName %><%= camelPageName %>/<%= pascalPageName %>Api';
import RestHelper from '<%= path %>helper/RestHelper';
import I<%= pascalPageName %>StateData from '<%= path %>interfaces/<%= instrumentName %><%= camelPageName %>/I<%= pascalPageName %>StateData';

const getItemById = async (id: number | string): Promise<I<%= pascalPageName %>StateData> => {
  const result = await <%= pascalPageName %>Api.getItem({ id }).then((response) => {
    return RestHelper.handleResultRequest(response).then((data: any) => {
      return data;
    });
  });
  return result;
};

const <%= pascalPageName %>Business = {
  getItemById,
};

export default <%= pascalPageName %>Business;
