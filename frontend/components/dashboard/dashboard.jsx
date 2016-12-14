import React from 'react';
import FriendsContainer from '../friends/friends_container.jsx';
import BillFormContainer from '../bill/bill_form_container.jsx';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { friendModalOpen: false, billModalOpen: false };
    this.handleClick = this.handleClick.bind(this);

    this.openFriendModal = this.openFriendModal.bind(this);
    this.closeFriendModal = this.closeFriendModal.bind(this);
    this.openBillModal = this.openBillModal.bind(this);
    this.closeBillModal = this.closeBillModal.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.router.push('/login'));
  }

  openFriendModal() {
    this.setState({friendModalOpen: true});
  }

  closeFriendModal() {
    this.setState({friendModalOpen: false});
  }
  openBillModal() {
    this.setState({billModalOpen: true});
  }

  closeBillModal() {
    this.setState({billModalOpen: false});
  }

  render() {
    return (
      <div>
        <div className="header-background-dashboard group">

          <header className="header-dashboard">
            <h1 className="header-logo-dashboard">SPLIT</h1>
              <ul className="header-list-dashboard">
                <li className="nav-button-dashboard" onClick={this.handleClick}>Log Out</li>
                <li>icon here</li>
                <li>{this.props.currentUser.username}</li>
              </ul>
          </header>

        </div>
        <div className="dashboard-center-container">

          <div className="dashboard-left">
            
            <FriendsContainer closeModal={this.closeFriendModal} isModalOpen={this.state.friendModalOpen}/>

          </div>

          <div className="dashboard-center">

            <section className="dashboard">
              <section className="dashboard-top">

                <h1>Dashboard</h1>

                <button onClick={this.openFriendModal}>Open Modal Add Friend</button>
                <button onClick={this.openBillModal}>Open Modal Create Bill</button>
                <button>Settle Up</button>

              </section>

              <div className="dashboard-line"></div>

              <section className="dashboard-bottom">
                <div className="dashboard-balance">

                </div>

                <div className="dashboard-you-owe">

                </div>

                <div className="dashboard-you-are-owed">

                </div>
              </section>
            </section>

          </div>

          <div className="dashboard-right">

          </div>




          <div>

            <BillFormContainer closeModal={this.closeBillModal} isModalOpen={this.state.billModalOpen} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
