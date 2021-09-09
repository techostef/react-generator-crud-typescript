---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Explorer/__test__/<%= pascalPageName %>ExplorerHeader.test.tsx
---
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from '../../../<%= path %>stores/index';
import <%= pascalPageName %>ExplorerHeader from '../<%= pascalPageName %>ExplorerHeader';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('<%= pascalPageName %>ExplorerHeader Render', () => {
  it('Render Without Crash', () => {
    render((
      <Provider store={store}>
        <<%= pascalPageName %>ExplorerHeader />
      </Provider>
    ));
  });
});
