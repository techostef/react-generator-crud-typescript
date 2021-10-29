import React from 'react';
import { render, screen } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import HeaderEditorDefault from '../HeaderEditorDefault';
import rootStore from '../../../stores/index';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('CellLinesExplorerContainer Render', () => {
  let isAdd = true;
  let isTouched = false;
  const handleBack = () => {};
  const dataLength = 0;
  let indexSelectedItem;
  let isSelectionOption = false;
  const pageNumber = 1;
  const pageSize = 10;
  let selectedItemsLength = 0;
  const title = 'Title Test';
  it('Render Without Crash', () => {
    render((
      <Provider store={store}>
        <HeaderEditorDefault
          dataLength={dataLength}
          handleBack={handleBack}
          indexSelectedItem={indexSelectedItem}
          isAdd={isAdd}
          isTouched={isTouched}
          isSelectionOption={isSelectionOption}
          pageNumber={pageNumber}
          pageSize={pageSize}
          selectedItemsLength={selectedItemsLength}
          title={title}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));
  });

  it('Test multi edit hide', () => {
    isAdd = true;
    isTouched = false;
    indexSelectedItem = 0;
    render((
      <Provider store={store}>
        <HeaderEditorDefault
          dataLength={dataLength}
          handleBack={handleBack}
          indexSelectedItem={indexSelectedItem}
          isAdd={isAdd}
          isTouched={isTouched}
          isSelectionOption={isSelectionOption}
          pageNumber={pageNumber}
          pageSize={pageSize}
          selectedItemsLength={selectedItemsLength}
          title={title}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));
    const prevIcon = screen.getByTestId('prev-icon');
    const nextIcon = screen.getByTestId('next-icon');

    expect(nextIcon).toHaveClass('hide');
    expect(prevIcon).toHaveClass('hide');
  });

  it('Test button disabled enable', () => {
    isAdd = false;
    isTouched = false;
    const { rerender } = render((
      <Provider store={store}>
        <HeaderEditorDefault
          dataLength={dataLength}
          handleBack={handleBack}
          indexSelectedItem={indexSelectedItem}
          isAdd={isAdd}
          isTouched={isTouched}
          isSelectionOption={isSelectionOption}
          pageNumber={pageNumber}
          pageSize={pageSize}
          selectedItemsLength={selectedItemsLength}
          title={title}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));
    let revertButton = screen.getByTestId('revert-button');
    let saveButton = screen.getByTestId('save-button');

    expect(revertButton).toBeDisabled();
    expect(saveButton).toBeDisabled();

    isTouched = true;
    rerender((
      <Provider store={store}>
        <HeaderEditorDefault
          dataLength={dataLength}
          handleBack={handleBack}
          indexSelectedItem={indexSelectedItem}
          isAdd={isAdd}
          isTouched={isTouched}
          isSelectionOption={isSelectionOption}
          pageNumber={pageNumber}
          pageSize={pageSize}
          selectedItemsLength={selectedItemsLength}
          title={title}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    revertButton = screen.getByTestId('revert-button');
    saveButton = screen.getByTestId('save-button');

    expect(revertButton).toBeEnabled();
    expect(saveButton).toBeEnabled();
  });

  it('Test multi edit disabled', () => {
    isAdd = false;
    isTouched = true;
    indexSelectedItem = 0;
    selectedItemsLength = 10;
    const { rerender } = render((
      <Provider store={store}>
        <HeaderEditorDefault
          dataLength={dataLength}
          handleBack={handleBack}
          indexSelectedItem={indexSelectedItem}
          isAdd={isAdd}
          isTouched={isTouched}
          isSelectionOption={isSelectionOption}
          pageNumber={pageNumber}
          pageSize={pageSize}
          selectedItemsLength={selectedItemsLength}
          title={title}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));
    const prevIcon = screen.getByTestId('prev-icon');
    const nextIcon = screen.getByTestId('next-icon');

    expect(prevIcon).toHaveClass('disabled');
    expect(nextIcon).not.toHaveClass('disabled');

    userEvent.click(nextIcon);

    indexSelectedItem = 1;

    rerender((
      <Provider store={store}>
        <HeaderEditorDefault
          dataLength={dataLength}
          handleBack={handleBack}
          indexSelectedItem={indexSelectedItem}
          isAdd={isAdd}
          isTouched={isTouched}
          isSelectionOption={isSelectionOption}
          pageNumber={pageNumber}
          pageSize={pageSize}
          selectedItemsLength={selectedItemsLength}
          title={title}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    expect(prevIcon).not.toHaveClass('disabled');
    expect(nextIcon).not.toHaveClass('disabled');

    userEvent.click(nextIcon);

    indexSelectedItem = 9;
    isSelectionOption = true;
    rerender((
      <Provider store={store}>
        <HeaderEditorDefault
          dataLength={dataLength}
          handleBack={handleBack}
          indexSelectedItem={indexSelectedItem}
          isAdd={isAdd}
          isTouched={isTouched}
          isSelectionOption={isSelectionOption}
          pageNumber={pageNumber}
          pageSize={pageSize}
          selectedItemsLength={selectedItemsLength}
          title={title}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    expect(prevIcon).not.toHaveClass('disabled');
    expect(nextIcon).toHaveClass('disabled');

    userEvent.click(prevIcon);

    indexSelectedItem = 0;
    isSelectionOption = true;
    rerender((
      <Provider store={store}>
        <HeaderEditorDefault
          dataLength={dataLength}
          handleBack={handleBack}
          indexSelectedItem={indexSelectedItem}
          isAdd={isAdd}
          isTouched={isTouched}
          isSelectionOption={isSelectionOption}
          pageNumber={pageNumber}
          pageSize={pageSize}
          selectedItemsLength={selectedItemsLength}
          title={title}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    expect(prevIcon).toHaveClass('disabled');
    expect(nextIcon).not.toHaveClass('disabled');
  });
});
