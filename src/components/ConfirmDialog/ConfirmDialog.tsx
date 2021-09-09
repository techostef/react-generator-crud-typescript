import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

interface IConfirmDialog {
  content?: string | React.ReactNode,
  handleCancel?: () => {},
  handleOk?: () => {},
  show: boolean,
  title?: string | React.ReactNode,
}

const ConfirmDialog: React.FC<IConfirmDialog> = ({
  show,
  content,
  handleCancel,
  handleOk,
  title,
}) => {
  return (
    <Modal title={title} visible={show} onOk={handleOk} onCancel={handleCancel}>
      { content }
    </Modal>
  );
};

ConfirmDialog.defaultProps = {
  content: undefined,
  handleCancel: undefined,
  handleOk: undefined,
  show: false,
  title: undefined,
};

ConfirmDialog.propTypes = {
  content: PropTypes.any,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  show: PropTypes.any,
  title: PropTypes.any,
};

export default React.memo(ConfirmDialog);
