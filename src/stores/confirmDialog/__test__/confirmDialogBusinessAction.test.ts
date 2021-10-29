import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../../index';
import confirmDialogBusinessAction from '../confirmDialogBusinessAction';
import IConfirmDialogState from '../../../interfaces/confirmDialog/IConfirmDialogState';
import UnitTestBusiness from '../../../business/UnitTestBusiness';

const { getState: getStateContent } = UnitTestBusiness;

const getState = (store): IConfirmDialogState => {
  return getStateContent<IConfirmDialogState>(store, 'confirmDialogState');
};

describe('ConfirmDialogBusinessAction', () => {
  it('test showDialog', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).show).toBe(false);
    dispatch(confirmDialogBusinessAction.showDialog({
      content: '',
      handleCancel: () => {},
      handleOk: () => {},
      title: 'title',
    }) as any);
    expect(getState(store).show).toBe(true);
    dispatch(confirmDialogBusinessAction.showDialog({
      content: '',
      title: 'title',
    }) as any);
    expect(typeof getState(store).handleOk !== 'undefined').toBe(true);
    expect(typeof getState(store).handleCancel !== 'undefined').toBe(true);
  });

  it('test hideDialog', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getState(store).show).toBe(false);
    dispatch(confirmDialogBusinessAction.showDialog({
      content: '',
      handleCancel: () => {},
      handleOk: () => {},
      title: 'title',
    }) as any);
    expect(getState(store).show).toBe(true);
    dispatch(confirmDialogBusinessAction.hideDialog() as any);
  });
});
