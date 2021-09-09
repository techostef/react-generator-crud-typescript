import confirmDialogStateAction from './confirmDialogStateAction';

interface IShowDialog {
  content?: any,
  handleCancel?: () => void,
  handleOk?: () => void,
  title?: any,
}

const showDialog = (data: IShowDialog) => {
  return (dispatch) => {
    const show = true;
    if (data.handleCancel === undefined) {
      data.handleCancel = () => dispatch(hideDialog());
    }
    if (data.handleOk === undefined) {
      data.handleOk = () => dispatch(hideDialog());
    }
    dispatch(confirmDialogStateAction.restoreState({
      content: data.content,
      handleCancel: data.handleCancel,
      handleOk: data.handleOk,
      show,
      title: data.title,
    }));
  };
};

const hideDialog = () => {
  return (dispatch) => {
    dispatch(confirmDialogStateAction.reset());
  };
};

const confirmDialogBusinessAction = {
  hideDialog,
  showDialog,
};

export default confirmDialogBusinessAction;
