import appStateAction from './appStateAction';
import IAppStateData from '../../interfaces/app/IAppStateData';
import ActionHelper from '../../helper/ActionHelper';

const {
  selectOnMulti,
} = ActionHelper;

// const setSelectedAll = (
//   isSelected = false,
// ) => (dispatch: any, getState: any) => {
//   const state = getState();
//   const { appState } = state;
//   const newData = appState
//     .toJS()
//     .data
//     .map((item: IAppStateData) => ({ ...item, isSelected }));

//   dispatch(appStateAction.restoreData(newData));
// };

// const setSelectedItem = (
//   Id = -1,
//   isSelected: boolean = false,
//   isMultiple: boolean = false,
// ) => (dispatch: any) => {
//   const unSelectAll = () => dispatch(setSelectedAll(false));
//   const selectItem = () => dispatch(appStateAction.editItemByKey({
//     Id,
//     key: 'isSelected',
//     value: isSelected,
//   }));
//   selectOnMulti(isMultiple, selectItem, unSelectAll);
// };

const appBusinessAction = {
  // setSelectedAll,
  // setSelectedItem,
};

export default appBusinessAction;
