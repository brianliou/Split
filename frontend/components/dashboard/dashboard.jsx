import React from 'react';
import FriendsFormContainer from '../friends/friends_form_container.jsx';


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
        <FriendsFormContainer />
      </div>
    );
  }
}

export default Dashboard;
