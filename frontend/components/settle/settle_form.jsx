import React from 'react';
import Modal from 'react-modal';
import { values } from 'lodash';

class SettleForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      settleFrom:"",
      settleTo:"",
      amount: "",
      whichSearch:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModalAction = this.closeModalAction.bind(this);
    this.chooseSettleFrom = this.chooseSettleFrom.bind(this);
    this.chooseSettleTo = this.chooseSettleTo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  closeModalAction() {
    this.props.closeModal();
    this.clearState();
  }

  updateAndQuery(input_type) {
    return (
      event => {
        this.setState({ [input_type]: event.target.value });
        this.setState({ whichSearch: input_type});
        this.props.searchFriends(event.target.value).then(users => { console.log("success");});
      }
    );

  }

  update(input_type) {
    return (
      event => {
        this.setState( {[input_type]: event.target.value });
        this.setState({whichSearch:""});
      }
    );
  }

  clearState() {
    this.setState({settleFrom:"", settleTo: "", amount:"", whichSearch:""});
  }

  handleSubmit(e) {
    e.preventDefault();
    const settleUpData = {settleFrom: this.findId(this.state.settleFrom), settleTo: this.findId(this.state.settleTo), amount: this.state.amount};

    this.props.settleBill(settleUpData).then(
      () => {
        // Put like a friend added box or something?
        // this.closeModal();
        this.closeModalAction();
        this.props.clearSearch();
        this.clearState();
      }, err => {
        // this.closeModal();
        this.props.clearSearch();
        this.clearState();

      }
    );

  }

  // Settle from Click

  handleClick(arg) {
    event.preventDefault();

    if (arg === "settleFrom") {
      this.setState({whichSearch: "settleFrom"});

    } else if(arg === "settleTo") {
      this.setState({whichSearch:"settleTo"});
    } else {
      this.setState({whichSearch: ""});
    }

  }

  // return the id of the user
  findId(username) {
    if(username ==="You") {
      return this.props.currentUser.id
    } else {
      const friends = this.props.friends;
      for(var user_key in friends) {
        let user = friends[user_key];
        if(user.username === username) {
          return user.id;
        }
      }
    }
  }


  chooseSettleFrom(e) {

    e.preventDefault();
    const username = e.currentTarget.textContent.replace(/\s/g, '');

    if(username === this.props.currentUser.username) {
      this.setState({settleFrom: 'You'});
    } else {

      this.setState({settleFrom: username});
    }

    this.setState({whichSearch:""});

  }

  chooseSettleTo(e) {
    e.preventDefault();
    const username = e.currentTarget.textContent.replace(/\s/g, '');

    if(username === this.props.currentUser.username) {
      this.setState({settleTo: 'You'});
    } else {

      this.setState({settleTo: username});
    }

    this.setState({whichSearch:""});

  }

  render() {
    const friendArray = values(this.props.friends);

    const settleFromList = friendArray.map((user, idx) => {
      return <li key={idx} onClick={this.chooseSettleFrom}>{user.username}</li>;
    });

    settleFromList.unshift(
      <li key={Object.keys(this.props.friends).length} onClick={this.chooseSettleFrom}>{this.props.currentUser.username}</li>
    )

    const settleToList = friendArray.map((user, idx) => {
      return <li key={idx} onClick={this.chooseSettleTo}>{user.username}</li>;
    });

    settleToList.unshift(
      <li key={Object.keys(this.props.friends).length} onClick={this.chooseSettleTo}>{this.props.currentUser.username}</li>
    )

    let formContent;
    formContent = (
      <div>

        <Modal isOpen={this.props.isModalOpen} contentLabel="Modal" className="settle-modal group" overlayClassName="modal-overlay">

          <div className="main-settle-modal">
            <h1>Settle Up <div onClick={this.closeModalAction}>x</div></h1>
            <fieldset className="settle-up-form">
              <form onSubmit={this.handleSubmit}>

                <div className="settle-info">

                  <div className="settle-payment">
                    <input
                      type="text"
                      value={this.state.settleFrom}
                      placeholder="Enter Payer"
                      onClick ={() => this.handleClick("settleFrom")}
                    />

                    <div>Paid</div>


                    <input
                      type="text"
                      value={this.state.settleTo}
                      placeholder="Enter Recipient"
                      onClick = {() => this.handleClick("settleTo")}
                    />
                </div>

                  <input
                    type="number"
                    value={this.state.amount}
                    placeholder="$0.00"
                    onChange = {this.update('amount')}
                  />
                </div>

              <br/>

                <div className="settle-button-group">
                  <div className="add-friend-button">
                    <input type="submit" value="Save"></input>
                  </div>
                  <button className="close-modal-button" onClick={this.closeModalAction}>Close</button>
                </div>

              </form>
            </fieldset>
          </div>
          <br/>


          {this.state.whichSearch === 'settleFrom' ? (
            <div className="side-modal">
              <h1>Choose a Payer</h1>
              <ul className="settle-user-list">
                {settleFromList}
              </ul>
            </div>

          ) : (
            <div></div>
          )}

          {this.state.whichSearch === 'settleTo' ? (
            <div className="side-modal">
              <h1>Choose a Recipient</h1>
              <ul className="settle-user-list">
                {settleToList}
              </ul>
            </div>
          ) : (
            <div></div>
          )}





        </Modal>
      </div>
    );

    return (
      <div>
        {formContent}
      </div>
    );
  }


}

export default SettleForm;
