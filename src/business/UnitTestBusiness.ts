import { Store } from 'redux';
import IState from '../interfaces/IState';

type INameState = keyof IState;

function getState<IStateContent>(store: Store, nameState: INameState) {
  const { getState: getStateContent } = store;
  const state = getStateContent() as IState;
  const targetState: any = state?.[nameState].toJS();
  return targetState as IStateContent;
}

const UnitTestBusiness = {
  getState,
};

export default UnitTestBusiness;
