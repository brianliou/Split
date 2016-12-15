import * as util from '../util/friendship_api_util.js';

export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const RECEIVE_ALL_FRIENDS = "RECEIVE_ALL_FRIENDS";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_SEARCHED_FRIENDS = "RECEIVE_SEARCHED_FRIENDS";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const RECEIVE_SEARCHED_USERS = "RECEIVE_SEARCHED_USERS";


export const receiveFriend = friend => {
  return {
    type: RECEIVE_FRIEND,
    friend: friend
  };
};


export const receiveAllFriends = friends => {
  return {
    type: RECEIVE_ALL_FRIENDS,
    friends: friends
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors: errors
  };
};

export const receiveSearchedFriends = friends => {
  return {
    type: RECEIVE_SEARCHED_FRIENDS,
    friends: friends
  };
};

export const receiveSearchedUsers = users => {
  return {
    type: RECEIVE_SEARCHED_USERS,
    users: users
  };
};



export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
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


export const getFriends = () => {
  return (dispatch) => {
    return util.getFriends().then(
      (friends) => dispatch(receiveAllFriends(friends))
    );
  };
};

export const searchFriends = (query) => {
  return (dispatch) => {
    return util.searchFriends(query).then(
      (friends) => dispatch(receiveSearchedFriends(friends))
    );
  };
};

export const searchUsers = (query) => {
  return (dispatch) => {
    return util.searchUsers(query).then(
      (users) => dispatch(receiveSearchedUsers(users))
    );
  };
};
