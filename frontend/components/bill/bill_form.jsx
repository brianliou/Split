import React from 'react';
import Modal from 'react-modal';

class BillForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      recipients: [],
      description: "",
      amount: "",
      date:"",
      splitAmount: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModalAction = this.closeModalAction.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
  }


  componentWillMount() {
    Modal.setAppElement('body');
    this.clearState();
  }

  openModal() {
    this.setState({open: true});
  }

  closeModalAction() {
    this.props.closeModal();
    this.clearState();
  }

  updateAndQuery(input_type) {
    return (
      event => {
        this.setState({ [input_type]: event.target.value });
        this.props.searchFriends(event.target.value).then(users => { console.log("success");});
      }
    );

  }

  update(input_type) {
    return (
      event => {
        this.setState( {[input_type]: event.target.value });
      }
    );
  }

  clearState() {
    // need to add other parts of the state
    this.setState({description:"", recipients: [], amount:"", date:"", splitAmount: 0});
  }


  // Adding a friend submit
  handleSubmit(e) {
    e.preventDefault();
    const recipientIds = this.findRecipientIds(this.state.recipients);

    const bill = {recipients: recipientIds,
                  description: this.state.description,
                  amount: this.state.amount,
                  bill_date: this.state.date};
    this.props.processBillForm(bill).then(
      () => {
        // Put like a friend added box or something?
        this.closeModal();
        this.props.clearSearch();
        this.clearState();
      }, err => {
        // this.closeModal();
        this.props.clearSearch();
        this.clearState();

      }
    );

  }

  findRecipientIds(recipients) {
    const friends = store.getState().friends.users;
    const idArray = [];

    recipients.forEach((username) => {
      for(var user_key in friends) {
        let user = friends[user_key];
        if(user.username === username) {
          idArray.push(user.id);
        }
      }

    });

    return idArray;

  }

  chooseUser(e) {

    const newRecipients = this.state.recipients.slice();
    e.preventDefault();
    const username = e.currentTarget.textContent.replace(/\s/g, '');
    newRecipients.push(username);
    this.setState({recipients: newRecipients });
    this.setState({username:""});

    this.props.clearSearch();

  }

  // keyPress(e) {
  // }

  // TO DO IF TIME: allow for selection of users from searchlist with keypress and enter



  render() {

    const searchList = this.props.search.map((el, idx) => {
      if (!this.state.recipients.includes(el.username)) {
          return <li key={idx} onClick={this.chooseUser}> {el.username} </li>;
        }
      });

    const selectedUsers = this.state.recipients.map((el, idx) => {
      return <li key={idx}>{el}</li>;
    });

    let formContent;
    formContent = (
      <div>
        <h1>Bill Form Component</h1>

        <Modal isOpen={this.props.isModalOpen} contentLabel="Modal" className="friend-modal group" overlayClassName="modal-overlay">
          <h1>Create a bill <div onClick={this.closeModalAction}>x</div></h1>
          <fieldset className="add-friend-form">
            <form onSubmit={this.handleSubmit}>

              <ul>
                {searchList}
                {selectedUsers}
                <li>
                  <input
                    type="text"
                    value={this.state.username}
                    placeholder="Enter People"
                    onChange = {this.updateAndQuery('username')}
                    />
                </li>
              </ul>

              <input
                type="text"
                value={this.state.description}
                placeholder="Enter Description"
                onChange = {this.update('description')}
              />

              <input
                type="number"
                value={this.state.amount}
                placeholder="Enter Amount"
                onChange = {this.update('amount')}
              />

              <input
                type="date"
                value={this.state.date}
                onChange = {this.update('date')}
              />

            <br/>

            <input type="submit" value="Save"></input>

            </form>
          </fieldset>

          <br/>

          <ul>
            {searchList}
          </ul>


          <button onClick={this.closeModalAction}>close modal</button>

        </Modal>
      </div>
    );

    return (
      <div>
        <h1>Bill Form here</h1>
        {formContent}
      </div>
    );
  }

}


export default BillForm;
