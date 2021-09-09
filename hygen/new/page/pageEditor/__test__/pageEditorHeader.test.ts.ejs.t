---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/__test__/<%= pascalPageName %>EditorHeader.test.tsx
---
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from '../../../<%= path %>stores/index';
import <%= pascalPageName %>EditorHeader from '../<%= pascalPageName %>EditorHeader';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('<%= pascalPageName %>EditorHeader Render', () => {
  it('Render Without Crash', () => {
    render((
      <Provider store={store}>
        <<%= pascalPageName %>EditorHeader />
      </Provider>
    ));
  });
});
