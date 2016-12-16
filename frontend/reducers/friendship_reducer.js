import { RECEIVE_FRIEND, RECEIVE_SEARCHED_USERS, RECEIVE_ALL_FRIENDS, RECEIVE_ERRORS, RECEIVE_SEARCHED_FRIENDS, CLEAR_SEARCH } from '../actions/friendship_actions.js';
import merge from 'lodash/merge';


const initialState = {
  users: {},
  errors: {}
};

const friendshipReducer = (state = initialState, action) => {
  let newState = merge({}, state);
  let tempState;
  Object.freeze(state);
  switch(action.type) {

    case RECEIVE_FRIEND:
      newState.users[action.friend.id] = action.friend;
      return newState;

    case RECEIVE_ALL_FRIENDS:
      let theState = {};
      let keys = Object.keys(action.friends);

      keys.forEach((key) => {
        theState[action.friends[key].id] = action.friends[key];
      });
      newState.users = theState;

      return newState;

    case RECEIVE_SEARCHED_FRIENDS:
      let keys1 = Object.keys(action.friends);
      let tempStateTwo = {};
      let finalState;
      keys1.forEach((key) => {
        tempStateTwo[action.friends[key].id] = action.friends[key];
      });

      if ('userResult' in newState) {
        newState.userResult = tempStateTwo;
        finalState = newState;
      } else {
        const myState = merge({}, { userResult: tempStateTwo }, newState);
        finalState = myState;
      }

      return finalState;
    case RECEIVE_SEARCHED_USERS:
      let keysTwo = Object.keys(action.users);
      let tempStateThree = {};
      let finalStateTwo;
      keysTwo.forEach((key) => {
        tempStateThree[action.users[key].id] = action.users[key];
      });

      if ('userResult' in newState) {
        newState.userResult = tempStateThree;
        finalStateTwo = newState;
      } else {
        const myState = merge({}, { userResult: tempStateThree }, newState);
        finalStateTwo = myState;
      }

      return finalStateTwo;


    case CLEAR_SEARCH:
      newState.userResult = [];
      return newState;

    case RECEIVE_ERRORS:

      tempState = merge({}, {users:newState}, {errors:action.errors});

      return tempState;
    default:
      return newState;
  }
};

export default friendshipReducer;
