import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './custom.scss';
import SidebarMain from './content/Main/SidebarMain/SidebarMain';
import IState from './interfaces/IState';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog';
import IConfirmDialogState from './interfaces/confirmDialog/IConfirmDialogState';
import RouteMain from './content/Main/RouteMain/RouteMain';

const mapStateToProps = (state: IState) => {
  return {
    isShowSidebar: state.appState.toJS().isShowSidebar,
    confirmDialogState: state.confirmDialogState.toJS() as IConfirmDialogState,
  };
};

const mapDispatchToProps = () => {
  return {

  };
};

interface IApp {
  isShowSidebar: boolean,
  confirmDialogState: IConfirmDialogState,
}

const App: React.FC<IApp> = ({
  isShowSidebar,
  confirmDialogState,
}) => {
  return (
    <>
      <div className="container-app" style={{ display: 'flex' }}>
        {isShowSidebar && <SidebarMain />}
        <RouteMain />
        <ConfirmDialog
          handleOk={confirmDialogState.handleOk}
          handleCancel={confirmDialogState.handleCancel}
          content={confirmDialogState.content}
          show={confirmDialogState.show}
          title={confirmDialogState.title}
        />
      </div>
    </>
  );
};

App.defaultProps = {
  isShowSidebar: true,
  confirmDialogState: undefined,
};

App.propTypes = {
  confirmDialogState: PropTypes.any,
  isShowSidebar: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
