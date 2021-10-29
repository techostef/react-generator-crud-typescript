---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/<%= pascalPageName %>EditorHeader.tsx
---
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IState from '../../<%= path %>interfaces/IState';
import <%= camelPageName %>BusinessActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>BusinessAction';
import <%= camelPageName %>StateActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>StateAction';
import HeaderEditorDefault from '../../<%= path %>components/HeaderEditorDefault/HeaderEditorDefault';
import './<%= pascalPageName %>EditorHeader.scss';

const mapStateToProps = (state: IState) => {
  const <%= camelPageName %>State = state.<%= camelPageName %>State.toJS();
  return {
    dataLength: <%= camelPageName %>State.data?.length ?? -1,
    selectedItemsLength: <%= camelPageName %>State.selectedItems?.length ?? -1,
    indexSelectedItem: <%= camelPageName %>State.indexSelectedItem,
    isAdd: <%= camelPageName %>State.indexSelectedItem === undefined,
    isSelectionOption: <%= camelPageName %>State.isSelectionOption,
    pageNumber: <%= camelPageName %>State.pageNumber,
    pageSize: <%= camelPageName %>State.pageSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    <%= camelPageName %>BusinessAction: bindActionCreators(<%= camelPageName %>BusinessActionImp as any, dispatch),
    <%= camelPageName %>StateAction: bindActionCreators(<%= camelPageName %>StateActionImp as any, dispatch),
  };
};

interface I<%= pascalPageName %>EditorHeader {
  dataLength: any,
  handleBack: () => void,
  selectedItemsLength: any,
  indexSelectedItem: any,
  isAdd: boolean,
  isSelectionOption: boolean,
  isSubmitDisabled: boolean
  isTouched: boolean,
  pageNumber: number,
  pageSize: number,
  <%= camelPageName %>BusinessAction: typeof <%= camelPageName %>BusinessActionImp,
  <%= camelPageName %>StateAction: typeof <%= camelPageName %>StateActionImp,
}

const <%= pascalPageName %>EditorHeader: React.FC<I<%= pascalPageName %>EditorHeader> = ({
  dataLength,
  handleBack,
  indexSelectedItem,
  isAdd,
  isSelectionOption,
  isSubmitDisabled,
  isTouched,
  pageNumber,
  pageSize,
  <%= camelPageName %>BusinessAction,
  <%= camelPageName %>StateAction,
  selectedItemsLength,
}) => {
  const title = !isAdd ? 'Edit <%= pascalPageName %>' : 'Create <%= pascalPageName %>';

  return (
    <HeaderEditorDefault
      dataLength={dataLength}
      handleBack={handleBack}
      extendDisabledSave={isSubmitDisabled}
      indexSelectedItem={indexSelectedItem}
      isAdd={isAdd}
      isTouched={isTouched}
      isSelectionOption={isSelectionOption}
      pageNumber={pageNumber}
      pageSize={pageSize}
      selectedItemsLength={selectedItemsLength}
      title={title}
      BusinessAction={<%= camelPageName %>BusinessAction}
      StateAction={<%= camelPageName %>StateAction}
    />
  );
};

<%= pascalPageName %>EditorHeader.propTypes = {
  handleBack: PropTypes.any,
  <%= camelPageName %>BusinessAction: PropTypes.any,
  <%= camelPageName %>StateAction: PropTypes.any,
  dataLength: PropTypes.any,
  selectedItemsLength: PropTypes.any,
  indexSelectedItem: PropTypes.any,
  isAdd: PropTypes.any,
  isSelectionOption: PropTypes.any,
  isSubmitDisabled: PropTypes.any,
  isTouched: PropTypes.any,
  pageNumber: PropTypes.any,
  pageSize: PropTypes.any,
};

<%= pascalPageName %>EditorHeader.defaultProps = {
  handleBack: () => {},
  <%= camelPageName %>BusinessAction: undefined,
  <%= camelPageName %>StateAction: undefined,
  dataLength: -1,
  selectedItemsLength: -1,
  indexSelectedItem: undefined,
  isAdd: false,
  isSelectionOption: false,
  isSubmitDisabled: true,
  isTouched: false,
  pageNumber: -1,
  pageSize: -1,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  React.memo(<%= pascalPageName %>EditorHeader),
);
