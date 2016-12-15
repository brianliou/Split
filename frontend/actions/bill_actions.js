import * as util from '../util/bill_form_api_util.js';

export const RECEIVE_BILL = "RECEIVE_BILL";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_BILLS = "RECEIVE_BILLS";

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

export const receiveBills = bills => {
  return {
    type: RECEIVE_BILLS,
    bills: bills
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

export const getBills = () => {
  return (dispatch) => {
    return util.fetchBills().then(
      (bills) => dispatch(receiveBills(bills)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};

export const settleBill = (bill) => {
  return (dispatch) => {
    return util.settleBill(bill).then(
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};
