import React from 'react';
import FriendsContainer from '../friends/friends_container.jsx';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.router.push('/login'));
  }

  render() {
    return (
      <div>
        <p>Dashboard page</p>
        <button onClick={this.handleClick}>Log Out</button>
        <FriendsContainer />
      </div>
    );
  }
}

export default Dashboard;
