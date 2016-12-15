import React from 'react';
import FriendsContainer from '../friends/friends_container.jsx';
import BillFormContainer from '../bill/bill_form_container.jsx';
import { isEmpty, values } from 'lodash';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { friendModalOpen: false,
                   billModalOpen: false,
                   balance: 0,
                   youOweAmount: 0,
                   youAreOwedAmount: 0
                 };
    this.handleClick = this.handleClick.bind(this);

    this.openFriendModal = this.openFriendModal.bind(this);
    this.closeFriendModal = this.closeFriendModal.bind(this);
    this.openBillModal = this.openBillModal.bind(this);
    this.closeBillModal = this.closeBillModal.bind(this);
    this.updatePaymentState = this.updatePaymentState.bind(this);
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

  componentWillMount() {
    this.props.getBills();
  }

  componentWillReceiveProps(nextProps) {
    this.updatePaymentState(nextProps.bills);
  }

  updatePaymentState(info) {

    let youAreOwedAmountState = 0;
    Object.keys(info.you_are_owed).forEach((el) => {

      youAreOwedAmountState += info.you_are_owed[el];
    });

    let youOweState = 0;
    Object.keys(info.you_owe).forEach((el) => {

      youOweState += info.you_owe[el];
    });

    this.setState({youOweAmount:youOweState});
    this.setState({youAreOwedAmount:youAreOwedAmountState});
    this.setState({balance:(youAreOwedAmountState - youOweState)});

  }

  render() {

    const youOweUsers = Object.keys(this.props.bills.you_owe).map((user, idx) => {
      return (
        <li key={idx} className="user-transaction">
          <div className="profile-pic"></div>
          <div className="transaction-info-you-owe">
            <div>{user}</div>
            <div>you owe <strong>${this.props.bills.you_owe[user].toFixed(2)}</strong></div>
          </div>
        </li>
      );

    });

    const youAreOwedUsers = Object.keys(this.props.bills.you_are_owed).map((user, idx) => {
      return (
        <li key={idx} className="user-transaction">
            <div className="profile-pic"></div>
            <div className="transaction-info-are-owed">
              <div>{user}</div>
              <div>owes you <strong>${this.props.bills.you_are_owed[user].toFixed(2)}</strong></div>
            </div>
        </li>
      );

    });

    return (
      <div>
        <div className="header-background-dashboard group">

          <header className="header-dashboard">
            <h1 className="header-logo-dashboard">SPLIT</h1>
              <ul className="header-list-dashboard">
                <li className="nav-button-dashboard" onClick={this.handleClick}>Log Out</li>
                <li><div className="profile-pic-header"></div></li>
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
                  <div className="title">Total Balance</div>
                  <div className={"amount " + (this.state.balance > 0 ? "positive" : "negative")}>${this.state.balance.toFixed(2)}</div>

                </div>

                <div className="dashboard-block">
                  <div className="dashboard-block-border">

                    <div className="title">You Owe</div>
                    <div className="amount-owe">${this.state.youOweAmount.toFixed(2)}</div>
                  </div>

                </div>

                <div className="dashboard-block">
                  <div className="title">You Are Owed</div>
                  <div className="amount-owed">${this.state.youAreOwedAmount.toFixed(2)}</div>

                </div>
              </section>
            </section>

            <section className="payments-section">
              <div className="owe-titles">
                <div>You Owe</div>
                <div>You are owed</div>
              </div>
              <div className="you-owe-half">

                {isEmpty(this.props.bills.you_owe) ? (

                  <div>You do not owe anything</div>
                ) : (
                  <ul>
                    {youOweUsers}

                  </ul>
                )}

              </div>

              <div className="you-are-owed-half">

                {isEmpty(this.props.bills.you_are_owed) ? (

                  <div>You are not owed anything</div>
                ) : (
                  <ul>
                    {youAreOwedUsers}

                  </ul>
                )}

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
