import { combineReducers } from 'redux';
import sessionReducer from './session_reducer.js';
import friendshipReducer from './friendship_reducer.js';
import billReducer from './bill_reducer.js';

const rootReducer = combineReducers({
  session: sessionReducer,
  friends: friendshipReducer,
  bills: billReducer
});

export default rootReducer;
