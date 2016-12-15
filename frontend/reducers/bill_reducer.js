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
    // case RECEIVE_BILL:
    //   // if you've created a bill you need to add it to your list of bills
    //   //
    //   // return a new state of bills with the new bill added
    //   newState.update = !newState.update;
    //   // newState.billList = action.bill;
    //   debugger
    //   return newState;
    // case RECEIVE_BILL_SETTLE:
    //   newState.billList = action.bills
    //   return newState;
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
