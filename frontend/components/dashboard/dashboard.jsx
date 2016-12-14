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
                <li><div className="person-icon"></div></li>
                <li>{this.props.currentUser.username}</li>
              </ul>
          </header>

        </div>
        <div className="dashboard-center-container">

          <div className="dashboard-left">

            <FriendsContainer closeModal={this.closeFriendModal} isModalOpen={this.state.friendModalOpen}/>

          </div>

          <div className="dashboard-center">

            <section className="dashboard-top-section">
              <section className="dashboard-top">

                <h1>Dashboard</h1>

                <ul className="dashboard-button-list">
                  <li><button onClick={this.openFriendModal}>Add Friend</button></li>
                  <li><button onClick={this.openBillModal}>Create Bill</button></li>
                  <li><button>Settle Up</button></li>
                </ul>

              </section>

              <section className="dashboard-bottom">
                <div className="dashboard-block">
                  <div class="title">Total Balance</div>
                  <div class="amount">$0.00</div>

                </div>

                <div className="dashboard-block">
                  <div className="dashboard-block-border">

                    <div class="title">You Owe</div>
                    <div class="amount">$0.00</div>
                  </div>

                </div>

                <div className="dashboard-block">
                  <div class="title">You Are Owed</div>
                  <div class="amount">$0.00</div>

                </div>
              </section>
            </section>

            <section className="payments-section">
              <div className="you-owe-half">

              </div>

              <div className="you-are-owed-half">
                
              </div>



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
