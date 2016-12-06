import { combineReducers } from 'redux';
import sessionReducer from './session_reducer.js';

const rootReducer = combineReducers({
  session: sessionReducer
});

export default rootReducer;
