
import React from 'react';
import Modal from 'react-modal';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendModalOpen: false,
      username:"",
      email:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModalAction = this.closeModalAction.bind(this);
    this.openModalAction = this.openModalAction.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
    // this.updateAndQuery = this.updateAndQuery.bind(this);
    // do not need to bind updateAndQuery because you immediately return and use a
    // fat arrow function which binds this to the context it was called in
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
   this.props.fetchFriends();
  }

  // openModal() {
  //   this.setState({open: true});
  // }


  openModalAction() {
    this.props.openModal();
  }

  closeModalAction () {
    this.props.closeModal();
    this.clearState();
  }

  updateAndQuery(input_type) {
    return (
      event => {
        this.setState({ [input_type]: event.target.value });
        this.props.searchUsers(event.target.value).then(users => { console.log("success");});
      }
    );

  }

  clearState() {
    this.setState({username:"", email:""});
  }


  // Adding a friend submit
  handleSubmit(e) {
    e.preventDefault();
    const user = {username: this.state.username, email: this.state.email};
    this.props.processFriendForm(user).then(
      () => {
        // Put like a friend added box or something?
        this.closeModalAction();
      }, err => {
        // this.closeModal();
        this.clearState();
      }
    );
  }

  chooseUser(e) {
    e.preventDefault();
    const username = e.currentTarget.textContent.replace(/\s/g, '');
    this.setState({username: username });
    this.props.clearSearch();

  }


  render() {

    const searchList = this.props.search.map((el, idx) => {
          return <li key={idx} onClick={this.chooseUser}> {el.username} </li>;
        });

    let formContent;
    formContent = (
      <div>
        <Modal isOpen={this.props.isModalOpen} contentLabel="Modal" className="friend-modal group" overlayClassName="modal-overlay">
          <h1>Add a Friend <div onClick={this.closeModalAction}>x</div></h1>
          <fieldset className="add-friend-form">
            <form onSubmit={this.handleSubmit}>
              <div className="friend-input">

                <input
                  type="text"
                  value={this.state.username}
                  placeholder="Type a username"
                  onChange = {this.updateAndQuery('username')}
                />

                <br/>

                <ul className="add-friend-search">
                  {searchList}
                </ul>
              </div>

              <div className="add-friend-button-group">
                <div className="add-friend-button">
                  <input type="submit" value="Add Friend"></input>
                </div>
                <button className="close-modal-button" onClick={this.closeModalAction}>Close</button>
              </div>

            </form>
          </fieldset>

        </Modal>
      </div>
    );

    const listContent = this.props.friends.map((user, idx) => {
      return <li key={idx}><div className="person-icon"></div>{user.username}</li>;
    });

    return (
      <div>
        {formContent}
        <div className="friends-list">
          <div className="friends-box">
            <h1>Friends</h1>
            <div onClick={this.openModalAction}>+Add</div>
          </div>
          <ul>
            {listContent}
          </ul>
        </div>
      </div>
    );
  }
}

export default Friends;
