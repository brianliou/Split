import React from 'react';
import { Link } from 'react-router';

class Homepage extends React.Component {

  render() {
    return (
      <div>
        <h2>homepage</h2>

        <header className="logo">
          <h1>split</h1>

          <nav className="nav">
            <ul>
              <li>Home</li>
              <Link to="/login">Log In</Link>
            </ul>
          </nav>
        </header>

        <div className="headline">
          <h1>Split</h1>
          <p>Use Split to share expenses and other bills with friends.</p>
        </div>

        {this.props.form}
      </div>
    );
  }
}

export default Homepage;
