import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from './stores/index';
import App from './App';

it('renders without crashing', () => {
  const store = createStore(rootStore, applyMiddleware(thunk));

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.createElement('div')
  );
});
