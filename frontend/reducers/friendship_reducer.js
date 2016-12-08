import { RECEIVE_FRIEND, ADD_FRIEND } from '../actions/friendship_actions.js';
import merge from 'lodash/merge';

const initialState = {
    "1": {
      username: "Brian",
      email: "brian@brian.com"
    },
    "2": {
      username: "Nick",
      email: "nick@nick.com"
    },
    "3": {
      username: "Matt",
      email: "matt@matt.com"
    }

};

const friendshipReducer = (state = initialState, action) => {
  let newState = merge({}, state);
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_FRIEND:
      newState = {

      }
  }
}
