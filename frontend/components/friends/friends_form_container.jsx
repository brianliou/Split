import FriendsForm from './friends_form.jsx';
import { addFriend, getFriends } from '../../actions/friendship_actions.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    friends: state.friends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(addFriend(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsForm);
