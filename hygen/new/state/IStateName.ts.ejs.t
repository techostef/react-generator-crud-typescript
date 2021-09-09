---
to: <%= absPath %>/interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State.ts
---
import IImmutableMap from '<%= path %>IImmutableMap';
import I<%= pascalStateName %>StateData from './I<%= pascalStateName %>StateData';

interface I<%= pascalStateName %>StateMain {
  data: I<%= pascalStateName %>StateData[],
  filters: Partial<I<%= pascalStateName %>StateData>,
  hasPrevious: boolean,
  hasNext: boolean,
  indexSelectedItem: number | string,
  isLoadingTable: boolean,
  isSelectionOption: boolean,
  orderBy: string,
  pageNumber: number,
  pageSize: number,
  selectedItems: I<%= pascalStateName %>StateData[],
  searchTerm: string,
  totalItems: number,
}

interface I<%= pascalStateName %>State extends IImmutableMap<I<%= pascalStateName %>StateMain> {
  data: I<%= pascalStateName %>StateData[],
  filters: Partial<I<%= pascalStateName %>StateData>,
  hasPrevious: boolean,
  hasNext: boolean,
  indexSelectedItem: number | string | undefined,
  isLoadingTable: boolean,
  isSelectionOption: boolean,
  orderBy: string,
  pageNumber: number,
  pageSize: number,
  searchTerm: string,
  selectedItems: I<%= pascalStateName %>StateData[],
  totalItems: number,
}

export default I<%= pascalStateName %>State;
