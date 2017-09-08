import { combineReducers } from 'redux-immutable';

import viewReducer from './viewReducer.js'

const rootReducer = combineReducers({
  view: viewReducer,
});

export default rootReducer;