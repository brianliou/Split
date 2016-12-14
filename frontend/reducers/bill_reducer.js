import { RECEIVE_ERRORS, RECEIVE_BILL, RECEIVE_BILLS } from '../actions/bill_actions.js';
import merge from 'lodash/merge';

const initialState = {
  billList: {},
  errors: {}
};

const billReducer = (state = initialState, action) => {
  let newState = merge({}, state);
  let tempState;
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_BILL:
      newState.billList = action.bill;
      return newState;
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
