import { Map } from 'immutable';
import IConfirmDialogState from '../../interfaces/confirmDialog/IConfirmDialogState';
import confirmDialogTypeEnum from './confirmDialogTypeEnum';

const initData: IConfirmDialogState = {
  content: null,
  handleCancel: undefined as any,
  handleOk: undefined as any,
  toJS: undefined as any,
  show: false,
  title: null,
};

const init = Map(initData as any);

const confirmDialogState = (state = init, action: any) => {
  let newState: any;
  switch (action.type) {
    case confirmDialogTypeEnum.reset:
      return init;

    case confirmDialogTypeEnum.restoreState:
      return Map(action.state);

    case confirmDialogTypeEnum.editPropertyStateByKey:
      newState = state.toJS() as unknown as IConfirmDialogState;
      newState[action.key] = action.value;
      return Map({
        ...newState,
      });

    default:
      return state;
  }
};

export default confirmDialogState;
