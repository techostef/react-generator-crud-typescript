import { Map } from 'immutable';
import routeTypeEnum from './routeTypeEnum';
import IRouteState from '../../interfaces/route/IRouteState';
import RouteEnum from '../../enums/RouteEnum';

const initData: IRouteState = {
  current: RouteEnum.home as keyof typeof RouteEnum,
  params: {},
  history: [],
  toJS: undefined as any,
};

const init = Map(initData as any);

const routeState = (state = init, action: any) => {
  let newState: IRouteState;
  let historyLength: number;
  const maxHistoryLength = 10;
  switch (action.type) {
    case routeTypeEnum.editParams:
      newState = state.toJS() as unknown as IRouteState;
      newState.params[action.key] = action.value;
      return Map(newState);

    case routeTypeEnum.setCurrent:
      newState = state.toJS() as unknown as IRouteState;

      newState.current = action.current;
      historyLength = newState?.history.length;
      if (
        newState?.history && newState?.history[historyLength - 1] !== action.current &&
        historyLength <= maxHistoryLength
      ) {
        newState.history.push(action.current);
      }

      return Map(newState);

    case routeTypeEnum.setParams:
      newState = state.toJS() as unknown as IRouteState;
      newState.params = action.params;
      return Map(newState);

    case routeTypeEnum.reset:
      return init;

    case routeTypeEnum.restoreState:
      return Map(action.data);

    default:
      return state;
  }
};

export default routeState;
