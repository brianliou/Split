import * as util from '../util/friendship_api_util.js';

export const ADD_FRIEND = "ADD_FRIEND";
export const GET_FRIENDS = "GET_FRIENDS";
export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";


export const receiveFriend = friend => {
  return {
    type: RECEIVE_FRIEND,
    friend: friend
  };
};


export const addFriend = (user) => {
  return (dispatch) => {
    return util.addFriend(user).then(
      (friend) => dispatch(receiveFriend(friend)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};
