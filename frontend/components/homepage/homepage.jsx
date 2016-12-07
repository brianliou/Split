import React from 'react';
import { Link } from 'react-router';
import SessionForm from '../session_form/session_form.jsx';

class Homepage extends React.Component {

  render() {

    return (
      <div>
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

        <div className="headline">
          <h1>Split</h1>
          <p>Use Split to share expenses and other bills with friends.</p>
        </div>

        <SessionForm />

      </div>
    );
  }
}

export default Homepage;
