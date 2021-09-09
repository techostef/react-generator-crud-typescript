import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PieChartOutlined, DesktopOutlined, UserOutlined, HomeFilled } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import Sidebar from '../../../components/sidebar/Sidebar';
import './SidebarMain.scss';
import routeStateActionImp from '../../../stores/route/routeStateAction';

const mapDispatchToProps = (dispatch) => {
  return {
    routeStateAction: bindActionCreators(routeStateActionImp, dispatch),
  };
};

interface ISidebarMain {
  routeStateAction: typeof routeStateActionImp,
}

const SidebarMain: React.FC<ISidebarMain> = ({
  routeStateAction,
}) => {
  const menus = [
    {
      content: 'Home',
      icon: <HomeFilled translate />,
      id: '1',
    },
    {
      content: 'Counter',
      icon: <PieChartOutlined translate />,
      id: '2',
    },
    {
      content: 'Labware',
      icon: <DesktopOutlined translate />,
      id: '3',
    },
    {
      content: 'Fetch Data',
      icon: <UserOutlined translate />,
      id: '4',
    },
  ];

  const onClick = (e: any) => {
    const key = e?.key ?? '';
    switch (key) {
      case '2':
        routeStateAction.setCurrent('createdManagement');
        break;
      default:
        routeStateAction.setCurrent('home');
        break;
    }
  };

  return (
    <Sidebar
      menus={menus}
      onClick={onClick}
      collapsedWidth={69}
    />
  );
};

SidebarMain.defaultProps = {
  routeStateAction: undefined,
};

SidebarMain.propTypes = {
  routeStateAction: PropTypes.any,
};

export default connect(null, mapDispatchToProps)(SidebarMain);
