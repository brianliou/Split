
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app.jsx';
import SessionFormContainer from './session_form/session_form_container.jsx';
import DashboardContainer from './dashboard/dashboard_container.jsx';
import HomePage from './homepage/homepage.jsx';


const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
    if(store.getState().session.currentUser) {
      replace('/');
    }
  }

  const _redirectIfLoggedOut = (nextState, replace) => {
    if(store.getState().session.currentUser === null) {
      replace('/login');
    }
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={App} >
          <IndexRoute component={HomePage}/>
          <Route path="/login" component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
          <Route path="/dashboard" component={DashboardContainer} onEnter={_redirectIfLoggedOut} />
        </Route>
      </Router>
    </Provider>
  );
}

export default Root;
