import IImmutableMap from '../IImmutableMap';

interface IConfirmDialogStateMain {
  content: any,
  handleOk: () => {},
  handleCancel: () => {},
  show: boolean,
  title: any,
}

interface IConfirmDialogState extends IImmutableMap<IConfirmDialogStateMain> {
  content: any,
  handleOk: () => {},
  handleCancel: () => {},
  show: boolean,
  title: any,
}

export default IConfirmDialogState;
