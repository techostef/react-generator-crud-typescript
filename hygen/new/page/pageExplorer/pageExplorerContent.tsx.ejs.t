---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Explorer/<%= pascalPageName %>ExplorerContent.tsx
---
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { batch, connect } from 'react-redux';
import { Table } from 'antd';
import { bindActionCreators } from 'redux';
import IState from '../../<%= path %>interfaces/IState';
import I<%= pascalPageName %>StateData from '../../<%= path %>interfaces/<%= instrumentName %><%= camelPageName %>/I<%= pascalPageName %>StateData';
import <%= camelPageName %>BusinessActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>BusinessAction';
import <%= camelPageName %>StateActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>StateAction';
import TableBusiness from '../../<%= path %>business/TableBusiness';
import './<%= pascalPageName %>ExplorerContent.scss';

const mapStateToProps = (state: IState) => {
  const <%= camelPageName %>State = state.<%= camelPageName %>State.toJS();
  return {
    data<%= pascalPageName %>: <%= camelPageName %>State.data,
    pageSize: <%= camelPageName %>State.pageSize,
    totalItems: <%= camelPageName %>State.totalItems,
    isLoadingTable: <%= camelPageName %>State.isLoadingTable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    <%= camelPageName %>BusinessAction: bindActionCreators(<%= camelPageName %>BusinessActionImp, dispatch),
    <%= camelPageName %>StateAction: bindActionCreators(<%= camelPageName %>StateActionImp, dispatch),
  };
};

interface I<%= pascalPageName %>ExplorerContent {
  <%= camelPageName %>BusinessAction: typeof <%= camelPageName %>BusinessActionImp,
  <%= camelPageName %>StateAction: typeof <%= camelPageName %>StateActionImp,
  data<%= pascalPageName %>: I<%= pascalPageName %>StateData[],
  isLoadingTable: boolean | undefined,
  pageSize: number | undefined,
  totalItems: number | undefined,
}

const <%= pascalPageName %>ExplorerContent: React.FC<I<%= pascalPageName %>ExplorerContent> = ({
  <%= camelPageName %>BusinessAction,
  <%= camelPageName %>StateAction,
  data<%= pascalPageName %>,
  isLoadingTable,
  pageSize,
  totalItems,
}) => {
  // eslint-disable-next-line no-undef
  const screenHeight = screen.height;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = useMemo(() => ([
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      isSearch: true,
      isSort: true,
    },
  ]), []);

  const getData = async () => {
    await batch(async () => {
      <%= camelPageName %>StateAction.editPropertyStateByKey('isLoadingTable', true);
      await <%= camelPageName %>BusinessAction.getFetchData();
      <%= camelPageName %>StateAction.editPropertyStateByKey('isLoadingTable', false);
    });
  };

  useEffect(() => {
    const init = async () => {
      await getData();
    };

    init();
  }, []);

  const onChangeTable = async (pagination: any, filters: any, sorter: any) => {
    const orderBy = TableBusiness.getOrderBy(sorter);
    await batch(() => {
      <%= camelPageName %>StateAction.editPropertyStateByKey('filters', filters);
      <%= camelPageName %>StateAction.editPropertyStateByKey('orderBy', `${orderBy}`);
      <%= camelPageName %>StateAction.editPropertyStateByKey('pageNumber', pagination.current);
      <%= camelPageName %>StateAction.editPropertyStateByKey('pageSize', pagination.pageSize);
    });
    await getData();
  };

  const handleSelectionItem = (selectedKeys: any, selectedRows: any[]) => {
    setSelectedRowKeys(selectedKeys);
    <%= camelPageName %>StateAction.restoreSelectedItems(selectedRows);
    <%= camelPageName %>StateAction.editPropertyStateByKey('isSelectionOption', selectedRows.length !== 0);
  };

  const handleSearchItem = async (value: string, keyName: string) => {
    <%= camelPageName %>StateAction.editFilters(keyName as keyof I<%= pascalPageName %>StateData, value);
    await getData();
  };

  return (
    <div className="<%= camelPageName %>-explorer-content">
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: handleSelectionItem,
          selectedRowKeys,
        }}
        loading={isLoadingTable}
        columns={columns}
        dataSource={data<%= pascalPageName %>}
        onSearch={handleSearchItem}
        scroll={{ y: screenHeight - 344 }}
        pagination={{
          pageSizeOptions: ['5', '10', '15', '20', '50', '100'],
          total: totalItems,
          pageSize,
        }}
        onChange={onChangeTable}
      />
    </div>
  );
};

<%= pascalPageName %>ExplorerContent.propTypes = {
  <%= camelPageName %>BusinessAction: PropTypes.any,
  <%= camelPageName %>StateAction: PropTypes.any,
  data<%= pascalPageName %>: PropTypes.any,
  isLoadingTable: PropTypes.bool,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
};

<%= pascalPageName %>ExplorerContent.defaultProps = {
  <%= camelPageName %>BusinessAction: undefined,
  <%= camelPageName %>StateAction: undefined,
  data<%= pascalPageName %>: [],
  isLoadingTable: false,
  pageSize: 15,
  totalItems: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(<%= pascalPageName %>ExplorerContent));
