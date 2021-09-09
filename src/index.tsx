/* eslint-disable no-undef */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/index';
import rootStore from './stores';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Get the application-wide store instance.
const store = process.env.NODE_ENV === 'production' ? createStore(rootStore, applyMiddleware(thunk)) : createStore(rootStore, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
