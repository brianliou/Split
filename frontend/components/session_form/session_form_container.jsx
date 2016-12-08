import SessionForm from './session_form.jsx';

import {login, signUp, clearErrors } from '../../actions/session_actions.js';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.session.errors
  };

};


const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.location.pathname === '/login' ? 'login' : 'signup';
  if(formType === 'login') {
    return {
      processForm: (user) => dispatch(login(user)),
      formType: formType,
      clearErrors: () => dispatch(clearErrors())
    };
  } else {
    return {
      processForm: (user) => dispatch(signUp(user)),
      formType: formType,
      clearErrors: () => dispatch(clearErrors())
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
