import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions.js';
import merge from 'lodash/merge';


const initialState = {
  currentUser: null,
  errors: []
};

const sessionReducer = (state = initialState, action) => {
  let newState = merge({}, state);
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      newState = {
        currentUser: action.currentUser,
        errors: []
      };
      return newState;
    case RECEIVE_ERRORS:
      newState = {
        currentUser: null,
        errors: action.errors
      };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
