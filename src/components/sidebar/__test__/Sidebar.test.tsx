import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from '../Sidebar';

const nameComponent = 'Sidebar';

describe('Sidebar test', () => {
  it(`${nameComponent} render without crash`, async () => {
    render(
      <div data-testid="SidebarId">
        <Sidebar menus={[]} />
      </div>,
    );

    await screen.findByTestId('SidebarId');
  });
  it(`${nameComponent} check menus`, async () => {
    const menus = [
      {
        id: '1',
        content: 'Option 1',
      },
      {
        id: '3',
        content: 'Option 2',
      },
      {
        id: 'sub1',
        content: 'User',
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
      },
    ];
    render(
      <div data-testid="SidebarId">
        <Sidebar menus={menus} />
      </div>,
    );

    userEvent.click(document.querySelector('.ant-layout-sider-trigger'));

    await screen.findByText('Option 1');
    await screen.findByText('Option 2');
    await screen.findByText('User');
    await screen.findByText('Team');
    await screen.findByText('Files');

    await screen.findByTestId('SidebarId');
  });
});
