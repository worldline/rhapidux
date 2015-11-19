import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { createStore, compose, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import * as history from 'history';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

// Build the list of middlewares we want in our store
const middlewares = [thunkMiddleware];
if (__DEV__ && canUseDOM) {
  middlewares.push(createLogger({ collapsed: true }));
}

// Build the list of store enhancers
const createHistory = canUseDOM ? history.createHistory : history.createMemoryHistory;
const storeEnhancers = [
  applyMiddleware(...middlewares),
  reduxReactRouter({ createHistory })
];
if (__DEV__) {
  const { devTools } = require('redux-devtools');
  storeEnhancers.push(devTools());
}

// Build the actual store
const store = compose(...storeEnhancers)(createStore)(reducer);

if (__DEV__ && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
