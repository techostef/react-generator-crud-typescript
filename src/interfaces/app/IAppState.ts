import IImmutableMap from '../IImmutableMap';

interface IAppStateMain {
  isShowSidebar: boolean,
}

interface IAppState extends IImmutableMap<IAppStateMain> {
  isShowSidebar: boolean,
}

export default IAppState;
