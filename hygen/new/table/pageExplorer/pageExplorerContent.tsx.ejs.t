---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Explorer/<%= pascalPageName %>ExplorerContent.tsx
---
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { batch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IState from '../../<%= path %>interfaces/IState';
import I<%= pascalPageName %>StateData from '../../<%= path %>interfaces/<%= instrumentName %><%= camelPageName %>/I<%= pascalPageName %>StateData';
import <%= camelPageName %>BusinessActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>BusinessAction';
import <%= camelPageName %>StateActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>StateAction';
import TableDefault from '../../<%= path %>components/TableDefault/TableDefault';
import <%= pascalPageName %>Api from '../../<%= path %>api/<%= instrumentName %><%= camelPageName %>/<%= pascalPageName %>Api';
import './<%= pascalPageName %>ExplorerContent.scss';

const mapStateToProps = (state: IState) => {
  const <%= camelPageName %>State = state.<%= camelPageName %>State.toJS();
  return {
    data<%= pascalPageName %>: <%= camelPageName %>State.data,
    filters: <%= camelPageName %>State.filters,
    pageSize: <%= camelPageName %>State.pageSize,
    totalItems: <%= camelPageName %>State.totalItems,
    isLoadingTable: <%= camelPageName %>State.isLoadingTable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    <%= camelPageName %>BusinessAction: bindActionCreators(<%= camelPageName %>BusinessActionImp as any, dispatch),
    <%= camelPageName %>StateAction: bindActionCreators(<%= camelPageName %>StateActionImp as any, dispatch),
  };
};

interface I<%= pascalPageName %>ExplorerContent {
  <%= camelPageName %>BusinessAction: typeof <%= camelPageName %>BusinessActionImp,
  <%= camelPageName %>StateAction: typeof <%= camelPageName %>StateActionImp,
  filters: any,
  data<%= pascalPageName %>: I<%= pascalPageName %>StateData[],
  isLoadingTable: boolean | undefined,
  pageSize: number | undefined,
  totalItems: number | undefined,
}

const <%= pascalPageName %>ExplorerContent: React.FC<I<%= pascalPageName %>ExplorerContent> = ({
  <%= camelPageName %>BusinessAction,
  <%= camelPageName %>StateAction,
  data<%= pascalPageName %>,
  filters,
  isLoadingTable,
  pageSize,
  totalItems,
}) => {
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
      await <%= camelPageName %>BusinessAction.getFetchItems();
      <%= camelPageName %>StateAction.editPropertyStateByKey('isLoadingTable', false);
    });
  };

  useEffect(() => {
    const init = async () => {
      await getData();
    };

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      await getData();
    };

    init();
  }, []);

  return (
    <div className="<%= camelPageName %>-explorer-content">
      <TableDefault
        apiContent={<%= pascalPageName %>Api}
        columns={columns}
        dataSource={data<%= pascalPageName %>}
        filters={filters}
        isLoadingTable={isLoadingTable}
        isUsingConfigColumn
        getData={getData}
        pageSize={pageSize}
        totalItems={totalItems}
        BusinessAction={<%= camelPageName %>BusinessAction}
        StateAction={<%= camelPageName %>StateAction}
      />
    </div>
  );
};

<%= pascalPageName %>ExplorerContent.propTypes = {
  <%= camelPageName %>BusinessAction: PropTypes.any,
  <%= camelPageName %>StateAction: PropTypes.any,
  data<%= pascalPageName %>: PropTypes.any,
  filters: PropTypes.any,
  isLoadingTable: PropTypes.bool,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
};

<%= pascalPageName %>ExplorerContent.defaultProps = {
  <%= camelPageName %>BusinessAction: undefined,
  <%= camelPageName %>StateAction: undefined,
  data<%= pascalPageName %>: [],
  filters: undefined,
  isLoadingTable: false,
  pageSize: 15,
  totalItems: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  React.memo(<%= pascalPageName %>ExplorerContent),
);
