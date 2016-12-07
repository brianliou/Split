import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store.js';
import Root from './components/root.jsx';


document.addEventListener("DOMContentLoaded", () => {
  let store;
  const root = document.getElementById('root');
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser, errors:[] } };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  ReactDOM.render(<Root store={store} />, root);
});
