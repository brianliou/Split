import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store.js';
import Root from './components/root.jsx';

import {receiveFriend, addFriend, getFriends, searchUsers } from './actions/friendship_actions.js';
import { createBill } from './actions/bill_actions.js';

window.receiveFriend = receiveFriend;
window.addFriend = addFriend;
window.getFriends = getFriends;
window.searchUsers = searchUsers;


window.createBill = createBill;

document.addEventListener("DOMContentLoaded", () => {
  let store;
  const root = document.getElementById('root');
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser, errors:[] } };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  window.store = store;


  ReactDOM.render(<Root store={store} />, root);
});
