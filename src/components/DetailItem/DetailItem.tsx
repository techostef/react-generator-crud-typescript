import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Layout } from 'antd';
import './DetailItem.scss';
import { ReactComponent as CloseCircleIcon } from '../../images/CloseCircle.svg';

const { Header, Footer, Content } = Layout;

interface IDetailItem {
  className?: '',
  header?: React.ReactNode,
  content: React.ReactNode,
  footer?: React.ReactNode,
  onClose?: () => void,
}

const DetailItem: React.FC<IDetailItem> & {
  Content: any
} = ({
  className,
  content,
  header,
  footer,
  onClose,
}) => {
  const handleClose = () => {
    if (typeof onClose === 'function') onClose();
  };

  return (
    <Layout className={`comp-detail-item ${className}`}>
      {header && (
        <Header>
          { header }
          {' '}
          <CloseCircleIcon
            className="detail-item-close-icon"
            data-testid="detail-item-close"
            onClick={handleClose}
          />
        </Header>
      )}
      {content && <Content>{ content }</Content>}
      {footer && <Footer>{ footer }</Footer>}
    </Layout>
  );
};

DetailItem.defaultProps = {
  className: '',
  content: undefined,
  footer: undefined,
  header: undefined,
  onClose: undefined,
};

DetailItem.propTypes = {
  className: PropTypes.any,
  content: PropTypes.any,
  footer: PropTypes.any,
  header: PropTypes.any,
  onClose: PropTypes.any,
};

const ContentComp: React.FC<{
  children: any
}> = ({
  children,
}) => {
  return (
    <div className="detail-item-content slim-scroll">{ children }</div>
  );
};

ContentComp.defaultProps = {
  children: any,
};

ContentComp.propTypes = {
  children: PropTypes.any,
};

DetailItem.Content = ContentComp;

export default DetailItem;
