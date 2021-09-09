import React from 'react';
import argTypesEnum from '../../../enums/argTypesEnum';
import Sidebar from "../Sidebar";
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  TeamOutlined
} from '@ant-design/icons';

export default {
  title: 'Example/Sidebar',
  component: Sidebar,
  argTypes: {
    menus: null,
  },
};

const Template = (args) => {
  return <Sidebar {...args}/>
}

export const SidebarDefault = Template.bind({})

const TemplateBasic = (args) => {
  const menus = [
    {
      id: '1',
      content: 'Option 1',
      icon: <PieChartOutlined />
    },
    {
      id: '3',
      content: 'Option 2',
      icon: <DesktopOutlined />
    },
    {
      id: 'sub1',
      content: 'User',
      icon: <UserOutlined />,
      children: [
        {
          id: '3',
          content: 'Tom'
        },
        {
          id: '4',
          content: 'Bill',
          icon: undefined
        },
        {
          id: '5',
          content: 'Alex'
        },
      ]
    },
    {
      id: 'sub3',
      content: 'Team',
      icon: <TeamOutlined />,
      children: [
        {
          id: '6',
          content: 'Tom'
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
      icon: <FileOutlined />
    },
  ]
  return <Sidebar menus={menus}/>
}

export const SidebarBasic = TemplateBasic.bind({})

