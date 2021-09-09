---
to: <%= absPath %>/Page<%= pascalPageName %>Container/__test__/<%= pascalPageName %>Container.test.tsx
---
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from '../../<%= path %>stores/index';
import <%= pascalPageName %>Container from '../<%= pascalPageName %>Container';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('<%= pascalPageName %>Container Render', () => {
  it('Render Without Crash', () => {
    render((
      <Provider store={store}>
        <<%= pascalPageName %>Container />
      </Provider>
    ));
  });
});
