
import React from 'react';
import Modal from 'react-modal';

class FriendsForm extends React.Component {
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
  }

  componentWillMount() {
    Modal.setAppElement('body');
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
    this.props.processForm(user).then(() => {
      this.closeModal();
      this.clearState();
    });

  }


  render() {
    let content;
    content = (
      <div>
        <h1>Friends Component</h1>
        <button onClick={this.openModal}>Open Modal Add Friend</button>
        <Modal isOpen={this.state.open} contentLabel="Modal">
          <h1>Inside of my modal</h1>
          <fieldset className="add-friend-form">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.username}
                placeholder="Username"
                onChange = {this.update('username')}
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

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default FriendsForm;
