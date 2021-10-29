import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, PageHeader } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../images/Close.svg';
import IStateAction from '../../interfaces/IStateAction';
import IBusinessAction from '../../interfaces/IBusinessAction';
import confirmDialogBusinessActionImp from '../../stores/confirmDialog/confirmDialogBusinessAction';

const mapDispatchToProps = (dispatch) => {
  return {
    confirmDialogBusinessAction: bindActionCreators(confirmDialogBusinessActionImp, dispatch),
  };
};

interface IHeaderEditorDefault {
  confirmDialogBusinessAction: typeof confirmDialogBusinessActionImp,
  dataLength: any,
  extendDisabledSave?: boolean,
  handleBack: () => void,
  indexSelectedItem: any,
  isAdd: boolean,
  isTouched: boolean,
  isSelectionOption: boolean,
  pageNumber: number,
  pageSize: number,
  selectedItemsLength: any,
  title: React.ReactNode,
  BusinessAction: IBusinessAction<any>,
  StateAction: IStateAction<any, any, any>,
}

const HeaderEditorDefault: React.FC<IHeaderEditorDefault> = ({
  confirmDialogBusinessAction,
  dataLength,
  extendDisabledSave,
  handleBack,
  indexSelectedItem,
  isAdd,
  isTouched,
  isSelectionOption,
  pageNumber,
  pageSize,
  selectedItemsLength,
  title,
  BusinessAction,
  StateAction,
}) => {
  const getData = async () => {
    await BusinessAction.getFetchItems();
  };

  const disabledHasPrevClass = useMemo(() => {
    if (isSelectionOption && indexSelectedItem === 0) {
      return 'disabled';
    }
    return indexSelectedItem === 0 ? 'disabled' : '';
  }, [indexSelectedItem, isSelectionOption]);

  const hideMultiEditButton = useMemo(() => {
    if (selectedItemsLength <= 1 || indexSelectedItem === undefined) return 'hide';
    return '';
  }, [selectedItemsLength, indexSelectedItem]);

  const disabledHasNextClass = useMemo(() => {
    if (isSelectionOption && indexSelectedItem === selectedItemsLength - 1) {
      return 'disabled';
    }

    return '';
  }, [indexSelectedItem, pageSize, dataLength, isSelectionOption]);

  const hideRevertButton = useMemo(() => {
    return isAdd ? 'hide' : '';
  }, [isAdd]);

  const handleConfirm = (doOk: () => void) => {
    confirmDialogBusinessAction.showDialog({
      title: 'Confirm',
      content: 'Do you want discard the changes?',
      handleOk: async () => {
        await doOk();
      },
    });
  };

  const doPrev = async () => {
    if (disabledHasPrevClass === 'disabled') return;
    if (indexSelectedItem === 0) {
      StateAction.editPropertyStateByKey('pageNumber', pageNumber - 1);
      await getData();
      StateAction.editPropertyStateByKey('indexSelectedItem', pageSize - 1);
    } else {
      const prev = indexSelectedItem - 1;
      if (isSelectionOption) {
        if (indexSelectedItem >= 0) {
          StateAction.editPropertyStateByKey('indexSelectedItem', prev);
        }
      } else {
        StateAction.editPropertyStateByKey('indexSelectedItem', prev);
      }
    }
    confirmDialogBusinessAction.hideDialog();
  };

  const doNext = async () => {
    if (disabledHasNextClass === 'disabled') return;
    if (indexSelectedItem === pageSize - 1) {
      StateAction.editPropertyStateByKey('pageNumber', pageNumber + 1);
      await getData();
      StateAction.editPropertyStateByKey('indexSelectedItem', 0);
    } else {
      const next = indexSelectedItem + 1;
      if (isSelectionOption) {
        if (indexSelectedItem < selectedItemsLength) {
          StateAction.editPropertyStateByKey('indexSelectedItem', next);
        }
      } else {
        StateAction.editPropertyStateByKey('indexSelectedItem', next);
      }
    }
    confirmDialogBusinessAction.hideDialog();
  };

  const handlePrev = async () => {
    if (!isTouched) {
      await doPrev();
      return;
    }
    await handleConfirm(doPrev);
  };

  const handleNext = async () => {
    if (!isTouched) {
      await doNext();
      return;
    }
    await handleConfirm(doNext);
  };

  const disabledSave = useMemo(() => {
    return (!isAdd && !isTouched) || extendDisabledSave;
  }, [isAdd, isTouched, extendDisabledSave]);

  const revert = () => {
    if (disabledSave) return;
    const temp = indexSelectedItem;
    StateAction.editPropertyStateByKey('indexSelectedItem', -1);
    setTimeout(() => {
      StateAction.editPropertyStateByKey('indexSelectedItem', temp);
    }, 10);
  };

  return (
    <header className="reagents-editor-header header-flex">
      <PageHeader
        ghost={false}
        backIcon={<CloseIcon data-testid="close-icon" />}
        onBack={handleBack}
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
        extra={[
          <LeftOutlined
            key="1"
            translate="yes"
            data-testid="prev-icon"
            className={`${disabledHasPrevClass} ${hideMultiEditButton}`}
            onClick={handlePrev}
          />,
          <RightOutlined
            key="2"
            translate="yes"
            data-testid="next-icon"
            className={`${disabledHasNextClass} ${hideMultiEditButton}`}
            onClick={handleNext}
          />,
          <Button
            disabled={disabledSave}
            className={hideRevertButton}
            key="3"
            data-testid="revert-button"
            htmlType="button"
            onClick={revert}
          >
            Revert
          </Button>,
          <Button
            disabled={disabledSave}
            data-testid="save-button"
            key="4"
            htmlType="submit"
            type="primary"
          >
            Save
          </Button>,
        ]}
        className="reagents-header-search fmlx-header-search"
      />
    </header>
  );
};

HeaderEditorDefault.propTypes = {
  confirmDialogBusinessAction: PropTypes.any,
  dataLength: PropTypes.any,
  extendDisabledSave: PropTypes.any,
  handleBack: PropTypes.any,
  indexSelectedItem: PropTypes.any,
  isAdd: PropTypes.any,
  isTouched: PropTypes.any,
  isSelectionOption: PropTypes.any,
  pageNumber: PropTypes.any,
  pageSize: PropTypes.any,
  selectedItemsLength: PropTypes.any,
  title: PropTypes.any,
  BusinessAction: PropTypes.any,
  StateAction: PropTypes.any,
};

HeaderEditorDefault.defaultProps = {
  confirmDialogBusinessAction: undefined,
  dataLength: -1,
  extendDisabledSave: false,
  handleBack: () => {},
  indexSelectedItem: undefined,
  isAdd: false,
  isTouched: false,
  isSelectionOption: false,
  pageNumber: -1,
  pageSize: -1,
  selectedItemsLength: -1,
  title: '',
  BusinessAction: undefined,
  StateAction: undefined,
};

export default connect(null, mapDispatchToProps)(
  HeaderEditorDefault,
);
