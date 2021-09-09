import IConfirmDialogState from '../../interfaces/confirmDialog/IConfirmDialogState';
import confirmDialogTypeEnum from './confirmDialogTypeEnum';

const editPropertyStateByKey = (key: keyof IConfirmDialogState, value) => ({
  type: confirmDialogTypeEnum.editPropertyStateByKey,
  key,
  value,
});

const reset = () => ({
  type: confirmDialogTypeEnum.reset,
});

const restoreState = (state = {}) => ({
  type: confirmDialogTypeEnum.restoreState, state,
});

const confirmDialogStateAction = {
  editPropertyStateByKey,
  reset,
  restoreState,
};

export default confirmDialogStateAction;
