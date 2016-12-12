
import React from 'react';
import Modal from 'react-modal';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username:"",
      email:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
 }

 componentDidMount() {
   this.props.fetchFriends();
 }

  openModal() {
    this.setState({open: true});
  }

  closeModal () {
    this.setState({open: false});
    this.clearState();
  }

  update(input_type) {
    return (
      event => this.setState({ [input_type]: event.target.value })
    );
  }

  clearState() {
    this.setState({username:"", email:""});
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {username: this.state.username, email: this.state.email};
    this.props.processFriendForm(user).then(
      () => {
        // Put like a friend added box or something?
        this.closeModal();
      }, err => {
        // this.closeModal();
        this.clearState();
      }
    );
  }

  handleInput(e) {
    e.preventDefault();
    debugger
    if (this.state.username === "") {
      return;
    }
    this.props.searchFriends(this.state.username).then(users => { console.log("success");});


      //create a list of users
      // GO to the receiveFriends dispatcha ction that would then go through reducer and then mapstatetoprops

  }


  render() {
    let formContent;
    formContent = (
      <div>
        <h1>Friends Component</h1>
        <button onClick={this.openModal}>Open Modal Add Friend</button>

        <Modal isOpen={this.state.open} contentLabel="Modal" className="friend-modal group" overlayClassName="modal-overlay">
          <h1>Add a Friend <div onClick={this.closeModal}>x</div></h1>
          <fieldset className="add-friend-form">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.username}
                placeholder="Username"
                onChange = {this.update('username')}
                onInput = {this.handleInput}
              />

            <br/>

            <input
              type="text"
              value={this.state.email}
              placeholder="Email"
              onChange = {this.update('email')}
            />

            <input type="submit" value="Add Friend"></input>

            </form>
          </fieldset>



          <button onClick={this.closeModal}>close modal</button>

        </Modal>
      </div>
    );

    const listContent = this.props.friends.map((user, idx) => {
      return <li key={idx}>{user.username}</li>;
    });

    return (
      <div>
        {formContent}
        <ul>
          {listContent}
        </ul>
      </div>
    );
  }
}

export default Friends;
