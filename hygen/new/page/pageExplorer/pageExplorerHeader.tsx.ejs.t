---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Explorer/<%= pascalPageName %>ExplorerHeader.tsx
---
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { batch, connect } from 'react-redux';
import { Button, Input, PageHeader } from 'antd';
import { bindActionCreators } from 'redux';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ReactComponent as ReactIcon } from '../../<%= path %>images/React.svg';
import confirmDialogBusinessActionImp from '../../<%= path %>stores/confirmDialog/confirmDialogBusinessAction';
import <%= camelPageName %>BusinessActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>BusinessAction';
import <%= camelPageName %>StateActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>StateAction';
import routeStateActionImp from '../../<%= path %>stores/route/routeStateAction';
import IState from '../../<%= path %>interfaces/IState';
import I<%= pascalPageName %>StateData from '../../<%= path %>interfaces/<%= instrumentName %><%= camelPageName %>/I<%= pascalPageName %>StateData';

import './<%= pascalPageName %>ExplorerHeader.scss';

const mapStateToProps = (state: IState) => {
  const <%= camelPageName %>State = state.<%= camelPageName %>State?.toJS();
  return {
    data: <%= camelPageName %>State.data,
    selectedItems: <%= camelPageName %>State.selectedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmDialogBusinessAction: bindActionCreators(confirmDialogBusinessActionImp, dispatch),
    <%= camelPageName %>BusinessAction: bindActionCreators(<%= camelPageName %>BusinessActionImp, dispatch),
    <%= camelPageName %>StateAction: bindActionCreators(<%= camelPageName %>StateActionImp, dispatch),
    routeStateAction: bindActionCreators(routeStateActionImp, dispatch),
  };
};

interface I<%= pascalPageName %>ExplorerHeader {
  confirmDialogBusinessAction: typeof confirmDialogBusinessActionImp,
  <%= camelPageName %>BusinessAction: typeof <%= camelPageName %>BusinessActionImp,
  <%= camelPageName %>StateAction: typeof <%= camelPageName %>StateActionImp,
  routeStateAction: typeof routeStateActionImp,
  data: I<%= pascalPageName %>StateData[],
  selectedItems: I<%= pascalPageName %>StateData[],
}

const <%= pascalPageName %>ExplorerHeader: React.FC<I<%= pascalPageName %>ExplorerHeader> = ({
  confirmDialogBusinessAction,
  <%= camelPageName %>BusinessAction,
  <%= camelPageName %>StateAction,
  routeStateAction,
  data,
  selectedItems,
}) => {
  const title = '<%= pascalPageName %>';

  const gotoEditor = () => {
    routeStateAction.setCurrent('home');
  };

  const handleAdd = () => {
    <%= camelPageName %>BusinessAction.clearSearchAndFilter();
    gotoEditor();
  };

  const handleEdit = () => {
    batch(() => {
      <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', 0);
      if (selectedItems.length === 0) {
        <%= camelPageName %>StateAction.restoreSelectedItems(data);
      }
    });
    gotoEditor();
  };

  const getData = async () => {
    batch(async () => {
      <%= camelPageName %>StateAction.editPropertyStateByKey('isLoadingTable', true);
      await <%= camelPageName %>BusinessAction.getFetchData();
      <%= camelPageName %>StateAction.editPropertyStateByKey('isLoadingTable', false);
    });
  };

  const [searchText, setSearchText] = useState<any>('');

  const handleEnter = async (e:any) => {
    if (e.keyCode === 13) {
      <%= camelPageName %>StateAction.editPropertyStateByKey('searchTerm', searchText);
      await getData();
    }
  };

  const doDelete = async () => {
    await <%= camelPageName %>BusinessAction.deleteItems(selectedItems);
    confirmDialogBusinessAction.hideDialog();
  };

  const showConfirmDelete = () => {
    if (selectedItems.length === 0) return;
    const content = <div>Are you sure you wants to delete the selected <%= camelPageName %>?</div>;
    confirmDialogBusinessAction.showDialog({
      content,
      handleOk: doDelete,
      title: 'Delete <%= pascalPageName %>',
    });
  };

  return (
    <header className="<%= camelPageName %>-explorer-header">
      <PageHeader
        ghost={false}
        title={(
          <div
            style={{
              display: 'flex',
            }}
          >
            <ReactIcon />
            <div style={{ marginLeft: '15px' }}>
              {title}
            </div>
          </div>
        )}
        // subTitle={}
        extra={[
          <Input.Search key="1" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyUp={handleEnter} />,
          <EditFilled onClick={handleEdit} translate={null} />,
          <DeleteFilled onClick={showConfirmDelete} translate={null} className={selectedItems.length === 0 ? 'disabled' : ''} />,
          <Button key="2" type="primary" className="btn-create" onClick={handleAdd}>Create New</Button>,
        ]}
        className="<%= camelPageName %>-header-search fmlx-header-search"
      />
    </header>
  );
};

<%= pascalPageName %>ExplorerHeader.propTypes = {
  confirmDialogBusinessAction: PropTypes.any,
  <%= camelPageName %>BusinessAction: PropTypes.any,
  <%= camelPageName %>StateAction: PropTypes.any,
  routeStateAction: PropTypes.any,
  data: PropTypes.any,
  selectedItems: PropTypes.any,
};

<%= pascalPageName %>ExplorerHeader.defaultProps = {
  confirmDialogBusinessAction: undefined,
  <%= camelPageName %>BusinessAction: undefined,
  <%= camelPageName %>StateAction: undefined,
  routeStateAction: undefined,
  data: [],
  selectedItems: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(<%= pascalPageName %>ExplorerHeader));
