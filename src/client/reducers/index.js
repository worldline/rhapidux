import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import color from './color';

const rootReducer = combineReducers({
  router: routerStateReducer,
  color
});

export default rootReducer;
