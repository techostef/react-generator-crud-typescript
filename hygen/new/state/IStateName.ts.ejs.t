---
to: <%= absPath %>/interfaces/<%= instrumentName %><%= camelStateName %>/I<%= pascalStateName %>State.ts
---
import IImmutableMap from '<%= path %>IImmutableMap';
import I<%= pascalStateName %>StateData from './I<%= pascalStateName %>StateData';
import IStateGeneral from '<%= path %>IStateGeneral';

declare type I<%= pascalStateName %>StateMain = IStateGeneral<I<%= pascalStateName %>StateData>;

declare type I<%= pascalStateName %>State = Omit<I<%= pascalStateName %>StateMain, 'toJS'> & IImmutableMap<I<%= pascalStateName %>StateMain>

export default I<%= pascalStateName %>State;
