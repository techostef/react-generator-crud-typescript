---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/__test__/<%= pascalPageName %>EditorContainer.test.tsx
---
import React from 'react';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from '../../../<%= path %>stores/index';
import <%= pascalPageName %>EditorContainer from '../<%= pascalPageName %>EditorContainer';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('<%= pascalPageName %>EditorContainer Render', () => {
  it('Render Without Crash', () => {
    render((
      <Provider store={store}>
        <<%= pascalPageName %>EditorContainer />
      </Provider>
    ));
  });
});
