import * as util from '../util/bill_form_api_util.js';

export const RECEIVE_BILL = "RECEIVE_BILL";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveBill = bill => {
  return {
    type: RECEIVE_BILL,
    bill: bill
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors: errors
  };
};


export const createBill = (bill) => {
  return (dispatch) => {
    return util.createBill(bill).then(
      (bill) => dispatch(receiveBill(bill)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};
