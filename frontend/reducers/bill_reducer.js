import { RECEIVE_ERRORS, RECEIVE_BILLS, } from '../actions/bill_actions.js';
import merge from 'lodash/merge';

const initialState = {
  billList: {"you_owe":{}, "you_are_owed":{}},
  errors: {},

  // fill out the keys on the initialState
};

const billReducer = (state = initialState, action) => {
  let newState = merge({}, state);
  let tempState;
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    case RECEIVE_BILLS:
      newState.billList = action.bills;
      return newState;
    default:
      return newState;
  }
};

export default billReducer;
