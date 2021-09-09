import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import './Sidebar.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface IMenus {
  id?: string | number,
  content?: any,
  icon?: any,
  children?: IMenus[]
}

interface ISidebar {
  className?: string,
  collapsedWidth?: number | undefined,
  menus?: IMenus[],
  // eslint-disable-next-line no-unused-vars
  onClick?: ({ item, key, keyPath, domEvent }) => void,
  style?: React.CSSProperties | undefined,
}

const Sidebar: React.FC<ISidebar> = ({
  className,
  collapsedWidth,
  menus,
  onClick,
  style,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const renderMenus = () => {
    return (
      menus?.map((item) => {
        if (item?.children) {
          return (
            <SubMenu key={item?.id} icon={item?.icon} title={item.content}>
              {item.children.map((itemChildren: any) => {
                return (
                  <Menu.Item
                    key={itemChildren?.id}
                    icon={itemChildren?.icon}
                  >
                    {itemChildren?.content}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item?.id} icon={item?.icon}>
            {item?.content}
          </Menu.Item>
        );
      })
    );
  };

  return (
    <Layout
      className={`fmlx-sidebar ${className}`}
      style={{ ...style, minHeight: '100vh' }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        collapsedWidth={collapsedWidth ?? 80}
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          onClick={onClick}
        >
          {renderMenus()}
        </Menu>
      </Sider>
    </Layout>
  );
};

Sidebar.defaultProps = {
  className: '',
  collapsedWidth: 80,
  onClick: () => {},
  menus: [],
  style: {},
};

Sidebar.propTypes = {
  className: PropTypes.string,
  collapsedWidth: PropTypes.number,
  onClick: PropTypes.func,
  menus: PropTypes.array,
  style: PropTypes.object,
};

export default React.memo(Sidebar);
