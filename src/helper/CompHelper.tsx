import React from 'react';
import { notification } from 'antd';

const widthFullComp = (data) => {
  return (
    <div style={{
      width: '100%',
    }}
    >
      {data}
    </div>
  );
};

const notificationInfo = (title: React.ReactNode, message: React.ReactNode) => {
  notification.info({
    message: title,
    description: message,
    placement: 'bottomRight',
  });
};

const CompHelper = {
  notificationInfo,
  widthFullComp,
};

export default CompHelper;
