import { RECEIVE_FRIEND, RECEIVE_ALL_FRIENDS, RECEIVE_ERRORS, RECEIVE_SEARCHED_FRIENDS, CLEAR_SEARCH } from '../actions/friendship_actions.js';
import merge from 'lodash/merge';

// const initialState = {
  // 2: {
  //   id: 2,
  //   username: "Brian",
  //   email: "brian@brian.com"
  // },
  // 3: {
  //   id: 3,
  //   username: "Nick",
  //   email: "nick@nick.com"
  // },
  // 4: {
  //   id:4,
  //   username: "Matt",
  //   email: "matt@matt.com"
  // }
// };

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
      return merge(newState, {[action.friend.id]:action.friend});

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

    case CLEAR_SEARCH:
      newState.userResult = [];
      return newState;

    case RECEIVE_ERRORS:

      tempState = merge({}, {users:newState}, {errors:action.errors});

      return tempState;
    default:
      return state;
  }
};

export default friendshipReducer;
