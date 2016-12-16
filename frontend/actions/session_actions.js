import * as util from '../util/session_api_util.js';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors: errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const signUp = (user) => {
  return (dispatch) => {
    return util.signUp(user).then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};

export const login = (user) => {
  return (dispatch) => {
    return util.login(user).then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};

export const logout = () => {
  return (dispatch) => {
    return util.logout().then(
      () => dispatch(receiveCurrentUser("")),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};
