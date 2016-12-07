import React from 'react';
import { Link } from 'react-router';
import SessionForm from '../session_form/session_form.jsx';

class Homepage extends React.Component {

  render() {

    return (
      <div className="homepage-container">
        <header className="header group">
          <div className="header-nav">
            <h1 className="header-logo">SPLIT</h1>

            <ul className="header-list">
              <li className="nav-button"><Link to="/login">Log In</Link></li>
              <li>or</li>
              <li className="nav-button-signup"><Link to="/">Home</Link></li>
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
              <SessionForm />
            </div>
          </div>

      </div>
    );
  }
}

export default Homepage;
