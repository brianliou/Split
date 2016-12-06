
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app.jsx';
import SessionFormContainer from './session_form/session_form_container.jsx';
import DashboardContainer from './dashboard/dashboard_container.jsx';


const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
    if(store.getState().session.currentUser) {
      replace('/');
    }
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={App} >
          <IndexRoute component={SessionFormContainer} />
          <Route path="/login" component={SessionFormContainer} /> //Create LoginFormComponent
          <Route path="/dashboard" component={DashboardContainer} />
        </Route>
      </Router>
    </Provider>
  );
}

export default Root;
