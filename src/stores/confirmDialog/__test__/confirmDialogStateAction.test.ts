import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../../index';
import confirmDialogStateAction from '../confirmDialogStateAction';
import IConfirmDialogState from '../../../interfaces/confirmDialog/IConfirmDialogState';
import UnitTestBusiness from '../../../business/UnitTestBusiness';

const { getState: getStateContent } = UnitTestBusiness;

const getConfirmDialogState = (store): IConfirmDialogState => {
  return getStateContent<IConfirmDialogState>(store, 'confirmDialogState');
};

describe('ConfirmDialogState', () => {
  it('test editPropertyStateByKey', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getConfirmDialogState(store).show).toBe(false);
    dispatch(confirmDialogStateAction.editPropertyStateByKey('show', true));
    expect(getConfirmDialogState(store).show).toBe(true);
  });

  it('test reset', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getConfirmDialogState(store).show).toBe(false);
    dispatch(confirmDialogStateAction.editPropertyStateByKey('show', true));
    expect(getConfirmDialogState(store).show).toBe(true);
    dispatch(confirmDialogStateAction.reset());
    expect(getConfirmDialogState(store).show).toBe(false);
  });

  it('test restoreState', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { dispatch } = store;
    expect(getConfirmDialogState(store).show).toBe(false);
    dispatch(confirmDialogStateAction.restoreState({
      ...getConfirmDialogState(store),
      show: true,
    }));
    expect(getConfirmDialogState(store).show).toBe(true);
  });
});
