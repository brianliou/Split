import React from 'react';
import Modal from 'react-modal';

class SettleForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      settleFrom:"",
      settleTo:"",
      amount: 0,
    };
  }

  componentWillMount() {
    Modal.setAppElement('body');
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
    this.setState({settleFrom:"", settleTo: "", amount:""});
  }

  handleSubmit(e) {
    e.preventDefault();
    const settleUpData = {settleFrom: this.findId(this.state.settleFrom), settleTo: this.findId(this.state.settleTo), amount: this.state.amount};
    this.props.settleBill(bill).then(
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
  // START HERE WITH settle form
  // IS IT OK FOR settleBill action not to affect anything in the reducer?

  // return the id of the user
  findId(username) {

  }

}

export default settleForm;
