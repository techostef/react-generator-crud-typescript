---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Explorer/<%= pascalPageName %>ExplorerHeader.tsx
---
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { batch, connect } from 'react-redux';
import { Button, PageHeader } from 'antd';
import { bindActionCreators } from 'redux';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ReactComponent as CellIcon } from '../../<%= path %>images/Cell.svg';
import confirmDialogBusinessActionImp from '../../<%= path %>stores/confirmDialog/confirmDialogBusinessAction';
import <%= camelPageName %>BusinessActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>BusinessAction';
import <%= camelPageName %>StateActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>StateAction';
import routeBusinessActionImp, { IRouteBusinessAction } from '../../<%= path %>stores/route/routeBusinessAction';
import IState from '../../<%= path %>interfaces/IState';
import I<%= pascalPageName %>StateData from '../../<%= path %>interfaces/<%= instrumentName %><%= camelPageName %>/I<%= pascalPageName %>StateData';

import './<%= pascalPageName %>ExplorerHeader.scss';

const mapStateToProps = (state: IState) => {
  const <%= camelPageName %>State = state.<%= camelPageName %>State?.toJS();
  return {
    selectedItems: <%= camelPageName %>State?.selectedItems ?? [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmDialogBusinessAction: bindActionCreators(confirmDialogBusinessActionImp, dispatch),
    <%= camelPageName %>BusinessAction: bindActionCreators(<%= camelPageName %>BusinessActionImp as any, dispatch),
    <%= camelPageName %>StateAction: bindActionCreators(<%= camelPageName %>StateActionImp as any, dispatch),
    routeBusinessAction: bindActionCreators(routeBusinessActionImp as any, dispatch),
  };
};

interface I<%= pascalPageName %>ExplorerHeader {
  confirmDialogBusinessAction: typeof confirmDialogBusinessActionImp,
  <%= camelPageName %>BusinessAction: typeof <%= camelPageName %>BusinessActionImp,
  <%= camelPageName %>StateAction: typeof <%= camelPageName %>StateActionImp,
  routeBusinessAction: IRouteBusinessAction,
  selectedItems: I<%= pascalPageName %>StateData[],
}

const <%= pascalPageName %>ExplorerHeader: React.FC<I<%= pascalPageName %>ExplorerHeader> = ({
  confirmDialogBusinessAction,
  <%= camelPageName %>BusinessAction,
  <%= camelPageName %>StateAction,
  routeBusinessAction,
  selectedItems,
}) => {
  const title = 'Reagent Library';

  const gotoEditor = () => {
    routeBusinessAction.goto<%= pascalPageName %>Editor();
  };

  const handleAdd = () => {
    if (selectedItems.length > 0) return;
    batch(() => {
      <%= camelPageName %>BusinessAction.clearSearchAndFilter();
      <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', undefined);
      gotoEditor();
    });
  };

  const handleEdit = () => {
    if (selectedItems.length === 0) return;
    batch(() => {
      <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', 0);
      gotoEditor();
    });
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

  useEffect(() => {
    return () => {
      if (routeBusinessAction.getCurrent() !== '<%= camelPageName %>Editor') {
        <%= camelPageName %>BusinessAction.clearSearchAndFilter();
      }
    };
  }, []);

  const classDisabledEdit = useMemo(() => (selectedItems.length === 0 ? 'disabled' : ''), [selectedItems.length]);

  const classDisabledDelete = useMemo(() => (selectedItems.length === 0 ? 'disabled' : ''), [selectedItems.length]);

  const classDisabledCreate = useMemo(() => (selectedItems.length > 0 ? 'disabled' : ''), [selectedItems.length]);

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
            <CellIcon />
            <div style={{ marginLeft: '15px' }}>
              {title}
            </div>
          </div>
        )}
        extra={[
          <EditFilled key="2" data-testid="edit-icon" className={classDisabledEdit} onClick={handleEdit} translate="yes" />,
          <DeleteFilled key="3" data-testid="delete-icon" onClick={showConfirmDelete} translate="yes" className={classDisabledDelete} />,
          <Button key="4" type="primary" data-testid="create-button" className={`btn-create ${classDisabledCreate}`} onClick={handleAdd}>Create</Button>,
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
  routeBusinessAction: PropTypes.any,
  selectedItems: PropTypes.any,
};

<%= pascalPageName %>ExplorerHeader.defaultProps = {
  confirmDialogBusinessAction: undefined,
  <%= camelPageName %>BusinessAction: undefined,
  <%= camelPageName %>StateAction: undefined,
  routeBusinessAction: undefined,
  selectedItems: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(<%= pascalPageName %>ExplorerHeader));
