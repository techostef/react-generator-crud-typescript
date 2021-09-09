---
to: <%= absPath %>/interfaces/<%= instrumentName %><%= camelStateName %>/IEditItemByKey<%= pascalStateName %>.ts
---
import I<%= pascalStateName %>StateData from './I<%= pascalStateName %>StateData';

interface IEditItemByKey<%= pascalStateName %> {
  key: keyof I<%= pascalStateName %>StateData,
  value: any,
  id?: any,
}

export default IEditItemByKey<%= pascalStateName %>;
