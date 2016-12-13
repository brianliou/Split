import { RECEIVE_ERRORS, RECEIVE_BILL } from '../actions/bill_actions.js';
import merge from 'lodash/merge';

const initialState = {
  bills: {},
  errors: {}
};

const billReducer = (state = initialState, action) => {
  let newState = merge({}, state);
  let tempState;
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_BILL:
      newState.bills = action.bill;
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return newState;
  }
};

export default billReducer;
