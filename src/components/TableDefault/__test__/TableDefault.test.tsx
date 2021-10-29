import React from 'react';
import { render, screen } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import TableDefault from '../TableDefault';
import rootStore from '../../../stores/index';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('CellLinesExplorerContainer Render', () => {
  const classTable = '';
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      isSort: true,
      isSearch: true,
    },
  ];
  let isUsingConfigColumn = true;
  const rowSelectionType = 'checkbox' as any;
  const pageSize = 10;
  const totalItems = 10;
  const filters = {};
  let dataSource: any[] = [];
  const isLoadingTable = false;
  const getData = () => {};

  it('Render Without Crash', () => {
    render((
      <Provider store={store}>
        <TableDefault
          apiContent={undefined}
          classTable={classTable}
          columns={columns}
          dataSource={dataSource}
          filters={filters}
          isLoadingTable={isLoadingTable}
          isUsingConfigColumn={isUsingConfigColumn}
          getData={getData}
          pageSize={pageSize}
          rowSelectionType={rowSelectionType}
          totalItems={totalItems}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));
  });

  it('Test use config column', () => {
    isUsingConfigColumn = false;
    dataSource = [{
      name: 'test',
    }];
    const { rerender } = render((
      <Provider store={store}>
        <TableDefault
          apiContent={undefined}
          classTable={classTable}
          columns={columns}
          dataSource={dataSource}
          filters={filters}
          isLoadingTable={isLoadingTable}
          isUsingConfigColumn={isUsingConfigColumn}
          getData={getData}
          pageSize={pageSize}
          rowSelectionType={rowSelectionType}
          totalItems={totalItems}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    expect(document.querySelectorAll('[data-testid="info-button"]')).toHaveLength(0);

    isUsingConfigColumn = true;

    rerender((
      <Provider store={store}>
        <TableDefault
          apiContent={undefined}
          classTable={classTable}
          columns={columns}
          dataSource={dataSource}
          filters={filters}
          isLoadingTable={isLoadingTable}
          isUsingConfigColumn={isUsingConfigColumn}
          getData={getData}
          pageSize={pageSize}
          rowSelectionType={rowSelectionType}
          totalItems={totalItems}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    expect(document.querySelectorAll('[data-testid="info-button"]')).toHaveLength(1);
  });

  it('Test click checkbox', () => {
    isUsingConfigColumn = true;
    dataSource = [
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      },
    ];

    render((
      <Provider store={store}>
        <TableDefault
          apiContent={undefined}
          classTable={classTable}
          columns={columns}
          dataSource={dataSource}
          filters={filters}
          isLoadingTable={isLoadingTable}
          isUsingConfigColumn={isUsingConfigColumn}
          getData={getData}
          pageSize={pageSize}
          rowSelectionType="checkbox"
          totalItems={totalItems}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    let listRow: HTMLTableRowElement[] = document.querySelectorAll('.ant-table-row') as any;

    userEvent.click(listRow[1]);
    expect(listRow[0]).not.toHaveClass('highlight');
    expect(listRow[1]).toHaveClass('highlight');

    const inputsCheckbox = document.querySelectorAll('input.ant-checkbox-input');
    userEvent.click(inputsCheckbox[1]);

    listRow = document.querySelectorAll('.ant-table-row') as any;

    expect(listRow[0]).not.toHaveClass('highlight');
    expect(listRow[1]).toHaveClass('highlight');
  });

  it('Test click radio', () => {
    isUsingConfigColumn = true;
    dataSource = [
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      },
    ];

    render((
      <Provider store={store}>
        <TableDefault
          apiContent={undefined}
          classTable={classTable}
          columns={columns}
          dataSource={dataSource}
          filters={filters}
          isLoadingTable={isLoadingTable}
          isUsingConfigColumn={isUsingConfigColumn}
          getData={getData}
          pageSize={pageSize}
          rowSelectionType="radio"
          totalItems={totalItems}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    let listRow: HTMLTableRowElement[] = document.querySelectorAll('.ant-table-row') as any;

    expect(listRow[0]).not.toHaveClass('highlight');
    expect(listRow[1]).not.toHaveClass('highlight');

    userEvent.click(listRow[1]);

    setTimeout(() => {
      expect(listRow[0]).not.toHaveClass('highlight');
      expect(listRow[1]).toHaveClass('highlight');

      const inputsRadio = document.querySelectorAll('input.ant-radio-input');
      userEvent.click(inputsRadio[0]);

      listRow = document.querySelectorAll('.ant-table-row') as any;

      expect(listRow[0]).toHaveClass('highlight');
      expect(listRow[1]).not.toHaveClass('highlight');
    }, 100);
  });

  it('Test detail item', () => {
    isUsingConfigColumn = true;
    dataSource = [{
      name: 'test',
    }];
    render((
      <Provider store={store}>
        <TableDefault
          customDetailItem={(item) => {
            return (
              <div>
                custom test:
                {' '}
                {item?.name}
              </div>
            );
          }}
          apiContent={undefined}
          classTable={classTable}
          columns={columns}
          dataSource={dataSource}
          filters={filters}
          isLoadingTable={isLoadingTable}
          isUsingConfigColumn={isUsingConfigColumn}
          getData={getData}
          pageSize={pageSize}
          rowSelectionType={rowSelectionType}
          totalItems={totalItems}
          BusinessAction={undefined}
          StateAction={undefined}
        />
      </Provider>
    ));

    const infoButton: any = document.querySelector('[data-testid="info-button"]');
    let detailItem = document.querySelectorAll('[data-testid="detail-item"]');
    expect(detailItem).toHaveLength(0);

    userEvent.click(infoButton);

    detailItem = document.querySelectorAll('[data-testid="detail-item"]');
    expect(detailItem).toHaveLength(1);
    screen.getByText('custom test: test');

    const closeButton: any = screen.getByTestId('detail-item-close');
    userEvent.click(closeButton);

    detailItem = document.querySelectorAll('[data-testid="detail-item"]');
    expect(detailItem).toHaveLength(0);
  });
});
