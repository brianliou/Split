import React from 'react';
import { Link } from 'react-router';
import SessionFormContainer from '../session_form/session_form_container.jsx';
import { signUp } from './../../actions/session_actions.js';

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.handleGuestLogin = this.handleGuestLogin.bind(this);
  }

  handleGuestLogin(e) {
    e.preventDefault();
    const user = {username:"Guest", email: "guest@guest.com", password: "password"};
    store.dispatch(signUp(user)).then(() => this.props.router.push('/dashboard'));
  }

  render() {
    return (
      <div className="homepage-container">
        <header className="header group">
          <div className="header-nav">
            <h1 className="header-logo">SPLIT</h1>

            <ul className="header-list">
              <li className="nav-button"><Link to="/login">Log In</Link></li>
              <li>or</li>
              <li className="nav-button-signup" onClick={this.handleGuestLogin}>Demo</li>
            </ul>
          </div>
        </header>
        <section className="main-content group">
          <div className="headline">
            <div className="top-line-headline">
              <div className="money-icon"></div>
              <h1>Split expenses with friends.</h1>
              <p><strong>Share</strong> bills and IOUs. <strong>Make sure</strong> everyone gets paid back. <strong>Totally free</strong> for web, iPhone, and Android.</p>
            </div>
          </div>
        </section>
          <div className="img-background"></div>
          <div className="image-form group">
            <div className="splitwise-img"></div>

            <div className="signup-form">
              <SessionFormContainer {...this.props} />
            </div>
          </div>

      </div>
    );
  }
}

export default Homepage;
