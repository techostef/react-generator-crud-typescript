---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Explorer/__test__/<%= pascalPageName %>ExplorerContainer.test.tsx
---
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from '../../../<%= path %>stores/index';
import <%= pascalPageName %>ExplorerContainer from '../<%= pascalPageName %>ExplorerContainer';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('<%= pascalPageName %>ExplorerContainer Render', () => {
  it('Render Without Crash', () => {
    render((
      <Provider store={store}>
        <<%= pascalPageName %>ExplorerContainer />
      </Provider>
    ));
  });
});
