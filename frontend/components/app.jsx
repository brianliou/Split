
import React from 'react';

const App = ({ children }) => {
  return (
    <div>
      <header className="logo">
        <h1>split</h1>

        <nav className="nav">
          <ul>
            <li>Home</li>
            <li>Login</li>
          </ul>
        </nav>
      </header>

      <div className="headline">
        <h1>Split</h1>
        <p>Use Split to share expenses and other bills with friends.</p>
      </div>
      { children }
    </div>
  );
}

export default App;
