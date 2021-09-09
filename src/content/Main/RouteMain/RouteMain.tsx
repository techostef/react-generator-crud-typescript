import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IState from '../../../interfaces/IState';
import RouteEnum from '../../../enums/RouteEnum';

const mapStateToProps = (state: IState) => {
  const routeState = state.routeState.toJS();
  return {
    current: routeState.current,
    history: routeState.history,
  };
};

interface IRouteMain {
  current?: keyof typeof RouteEnum,
}

const RouteMain: React.FC<IRouteMain> = ({
  current,
}) => {
  const render = () => {
    switch (current) {
      case RouteEnum.createdManagement:
        return <div />;
      case RouteEnum.createdEditor:
        return <div />;
      case RouteEnum.home:
      default:
        return <div />;
    }
  };

  return (
    <>
      {render()}
    </>
  );
};

RouteMain.defaultProps = {
  current: undefined,
};

RouteMain.propTypes = {
  current: PropTypes.any,
};

export default connect(mapStateToProps, null)(React.memo(RouteMain));
