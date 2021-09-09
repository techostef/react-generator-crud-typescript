import { batch } from 'react-redux';
import _ from 'lodash';

const generateID = () => `${new Date().getTime()}${Math.floor(Math.random() * 200)}`;

const selectOnMulti = (
  isMultiple = false,
  handleSelectItem = () => {},
  handleUnSelectAll = () => {},
) => {
  if (isMultiple) {
    handleSelectItem();
  } else {
    batch(() => {
      handleUnSelectAll();
      handleSelectItem();
    });
  }
};

const getNewNameDuplicateItem = (orginalName = '', listItems = []) => {
  let index = 1;
  let item = listItems.find(
    (itemData: any) => itemData.name === `${orginalName}(${index})`,
  );
  while (item) {
    index += 1;
    const name1 = `${orginalName}(${index})`;
    item = listItems.find((itemData: any) => itemData.name === name1);
  }
  return `${orginalName}(${index})`;
};

const duplicateGeneral = (selectedListItems = [], listItems = []) => {
  const newListItems = _.cloneDeep(listItems);
  selectedListItems.forEach((item: any) => {
    newListItems.push(
      {
        ...item,
        ID: generateID(),
        name: getNewNameDuplicateItem(item.name, listItems) },
    );
  });
  return newListItems;
};

const removeGeneral = (removeLists = [], listItems = []) => {
  let newListItems = _.cloneDeep(listItems);
  newListItems = newListItems.filter(
    (item) => !removeLists.find((itemRemove: any) => item.ID === itemRemove.ID),
  );
  return newListItems;
};

const actionHelper = {
  duplicateGeneral,
  generateID,
  selectOnMulti,
  removeGeneral,
};

export default actionHelper;
