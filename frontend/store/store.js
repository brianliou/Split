import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer.js';

const configureStore = (preloadedState = {}) => {

  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
}


export default configureStore;
