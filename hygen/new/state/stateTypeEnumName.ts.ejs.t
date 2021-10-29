---
to: <%= absPath %>/stores/<%= instrumentName %><%= camelStateName %>/<%= camelStateName %>TypeEnum.ts
---
const <%= camelStateName %>TypeEnum = {
  addItem: '<%= camelStateName %>/addItem',
  editFilters: '<%= camelStateName %>/editFilters',
  editItemByKey: '<%= camelStateName %>/editItemByKey',
  editPropertyStateByKey: '<%= camelStateName %>/editPropertyStateByKey',
  reset: '<%= camelStateName %>/reset',
  restoreData: '<%= camelStateName %>/restoreData',
  restoreSelectedItems: '<%= camelStateName %>/restoreSelectedItems',
  restoreState: '<%= camelStateName %>/restoreState',
  setItem: '<%= camelStateName %>/setItem',
  removeItem: '<%= camelStateName %>/removeItem',
};

export default <%= camelStateName %>TypeEnum;
