---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/<%= pascalPageName %>EditorHeader.tsx
---
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, PageHeader } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { ReactComponent as CloseIcon } from '../../<%= path %>images/Close.svg';
import IState from '../../<%= path %>interfaces/IState';
import <%= camelPageName %>BusinessActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>BusinessAction';
import <%= camelPageName %>StateActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>StateAction';
import routeStateActionImp from '../../<%= path %>stores/route/routeStateAction';
import './<%= pascalPageName %>EditorHeader.scss';

const mapStateToProps = (state: IState) => {
  const <%= camelPageName %>State = state.<%= camelPageName %>State.toJS();
  return {
    dataLength: <%= camelPageName %>State.data?.length ?? -1,
    selectedItemsLength: <%= camelPageName %>State.selectedItems?.length ?? -1,
    indexSelectedItem: <%= camelPageName %>State.indexSelectedItem,
    isSelectionOption: <%= camelPageName %>State.isSelectionOption,
    hasPrevious: <%= camelPageName %>State.hasPrevious,
    hasNext: <%= camelPageName %>State.hasNext,
    pageNumber: <%= camelPageName %>State.pageNumber,
    pageSize: <%= camelPageName %>State.pageSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    <%= camelPageName %>BusinessAction: bindActionCreators(<%= camelPageName %>BusinessActionImp, dispatch),
    <%= camelPageName %>StateAction: bindActionCreators(<%= camelPageName %>StateActionImp, dispatch),
    routeStateAction: bindActionCreators(routeStateActionImp, dispatch),
  };
};

interface I<%= pascalPageName %>EditorHeader {
  <%= camelPageName %>BusinessAction: typeof <%= camelPageName %>BusinessActionImp,
  <%= camelPageName %>StateAction: typeof <%= camelPageName %>StateActionImp,
  dataLength: any,
  selectedItemsLength: any,
  indexSelectedItem: any,
  isSelectionOption: boolean,
  hasPrevious: boolean,
  hasNext: boolean,
  pageNumber: number,
  pageSize: number,
  routeStateAction: typeof routeStateActionImp,
}

const <%= pascalPageName %>EditorHeader: React.FC<I<%= pascalPageName %>EditorHeader> = ({
  <%= camelPageName %>BusinessAction,
  <%= camelPageName %>StateAction,
  dataLength,
  selectedItemsLength,
  indexSelectedItem,
  isSelectionOption,
  hasPrevious,
  hasNext,
  pageNumber,
  pageSize,
  routeStateAction,
}) => {
  const title = 'Create <%= pascalPageName %>';

  const gotoManagement = () => {
    routeStateAction.setCurrent('home');
  };

  const getData = async () => {
    await <%= camelPageName %>BusinessAction.getFetchData();
  };

  const hideMultiEditButton = useMemo(() => {
    if (selectedItemsLength <= 1) return 'hide';
    return '';
  }, [selectedItemsLength]);

  const disabledHasPrevClass = useMemo(() => {
    if (isSelectionOption && indexSelectedItem === 0) {
      return 'disabled';
    }
    return !hasPrevious && indexSelectedItem === 0 ? 'disabled' : '';
  }, [hasPrevious, indexSelectedItem, isSelectionOption]);

  const disabledHasNextClass = useMemo(() => {
    if (isSelectionOption && indexSelectedItem === selectedItemsLength - 1) {
      return 'disabled';
    }

    if (!hasNext) {
      if (indexSelectedItem === pageSize - 1) return 'disabled';
      if (indexSelectedItem === dataLength - 1) return 'disabled';
      return '';
    }
    return '';
  }, [hasNext, indexSelectedItem, pageSize, dataLength, isSelectionOption]);

  const handlePrev = async () => {
    if (disabledHasPrevClass === 'disabled') return;
    if (indexSelectedItem === 0) {
      if (!hasPrevious) return;
      <%= camelPageName %>StateAction.editPropertyStateByKey('pageNumber', pageNumber - 1);
      await getData();
      <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', pageSize - 1);
    } else {
      const prev = indexSelectedItem - 1;
      if (isSelectionOption) {
        if (indexSelectedItem >= 0) {
          <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', prev);
        }
      } else {
        <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', prev);
      }
    }
  };

  const handleNext = async () => {
    if (disabledHasNextClass === 'disabled') return;
    if (indexSelectedItem === pageSize - 1) {
      if (!hasNext) return;
      <%= camelPageName %>StateAction.editPropertyStateByKey('pageNumber', pageNumber + 1);
      await getData();
      <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', 0);
    } else {
      const next = indexSelectedItem + 1;
      if (isSelectionOption) {
        if (indexSelectedItem < selectedItemsLength) {
          <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', next);
        }
      } else {
        <%= camelPageName %>StateAction.editPropertyStateByKey('indexSelectedItem', next);
      }
    }
  };

  return (
    <header className="<%= camelPageName %>-editor-header">
      <PageHeader
        ghost={false}
        backIcon={<CloseIcon />}
        onBack={gotoManagement}
        title={(
          <div
            style={{
              display: 'flex',
            }}
          >
            <div style={{ marginLeft: '15px' }}>
              {title}
            </div>
          </div>
        )}
        // subTitle={}
        extra={[
          <LeftOutlined
            translate={null}
            className={`${disabledHasPrevClass} ${hideMultiEditButton}`}
            onClick={handlePrev}
          />,
          <RightOutlined
            translate={null}
            className={`${disabledHasNextClass} ${hideMultiEditButton}`}
            onClick={handleNext}
          />,
          <Button key="1" htmlType="submit" type="primary">Submit</Button>,
        ]}
        className="<%= camelPageName %>-header-search fmlx-header-search"
      />
    </header>
  );
};

<%= pascalPageName %>EditorHeader.propTypes = {
  <%= camelPageName %>BusinessAction: PropTypes.any,
  <%= camelPageName %>StateAction: PropTypes.any,
  dataLength: PropTypes.any,
  selectedItemsLength: PropTypes.any,
  indexSelectedItem: PropTypes.any,
  isSelectionOption: PropTypes.any,
  hasPrevious: PropTypes.any,
  hasNext: PropTypes.any,
  pageNumber: PropTypes.any,
  pageSize: PropTypes.any,
  routeStateAction: PropTypes.any,
};

<%= pascalPageName %>EditorHeader.defaultProps = {
  <%= camelPageName %>BusinessAction: undefined,
  <%= camelPageName %>StateAction: undefined,
  dataLength: -1,
  selectedItemsLength: -1,
  indexSelectedItem: undefined,
  isSelectionOption: false,
  hasPrevious: false,
  hasNext: false,
  pageNumber: -1,
  pageSize: -1,
  routeStateAction: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(<%= pascalPageName %>EditorHeader));
