import React from 'react';
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Sidebar from '../Sidebar';

export default {
  title: 'Example/Sidebar',
  component: Sidebar,
  argTypes: {
    menus: null,
  },
};

const Template = (args) => {
  return <Sidebar menus={args?.menus ?? []} />;
};

export const SidebarDefault = Template.bind({});

const TemplateBasic = () => {
  const menus = [
    {
      id: '1',
      content: 'Option 1',
      icon: <PieChartOutlined translate="yes" />,
    },
    {
      id: '3',
      content: 'Option 2',
      icon: <DesktopOutlined translate="yes" />,
    },
    {
      id: 'sub1',
      content: 'User',
      icon: <UserOutlined translate="yes" />,
      children: [
        {
          id: '3',
          content: 'Tom',
        },
        {
          id: '4',
          content: 'Bill',
          icon: undefined,
        },
        {
          id: '5',
          content: 'Alex',
        },
      ],
    },
    {
      id: 'sub3',
      content: 'Team',
      icon: <TeamOutlined translate="yes" />,
      children: [
        {
          id: '6',
          content: 'Tom',
        },
        {
          id: '8',
          content: 'Bill',
          // icon: <DesktopOutlined />
        },
      ],
    },
    {
      id: '9',
      content: 'Files',
      icon: <FileOutlined translate="yes" />,
    },
  ];
  return <Sidebar menus={menus} />;
};

export const SidebarBasic = TemplateBasic.bind({});
