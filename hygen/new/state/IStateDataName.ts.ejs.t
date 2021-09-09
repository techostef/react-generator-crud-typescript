---
to: <%= absPath %>/interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>StateData.ts
---
interface I<%= pascalStateName %>StateData {
  id: any,
  name: string,
  isSelected: boolean,
}

export default I<%= pascalStateName %>StateData;
