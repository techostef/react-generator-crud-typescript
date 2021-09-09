import IImmutableMap from '../IImmutableMap';
import RouteEnum from '../../enums/RouteEnum';

interface IRouteStateMain {
  current: keyof typeof RouteEnum,
  params: {
    [name: string]: string | number,
  },
  history: any[],
}

interface IRouteState extends IImmutableMap<IRouteStateMain> {
  current: keyof typeof RouteEnum,
  params: {
    [name: string]: string | number,
  },
  history: any[],
}

export default IRouteState;
