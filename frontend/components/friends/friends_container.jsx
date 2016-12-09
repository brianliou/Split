import Friends from './friends.jsx';
import { addFriend, getFriends } from '../../actions/friendship_actions.js';
import { connect } from 'react-redux';
import { selectAllFriends } from '../../reducers/selectors.js';

const mapStateToProps = state => {
  debugger
  return {
    friends: selectAllFriends(state.friends.users),
    errors: state.friends.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processFriendForm: (user) => dispatch(addFriend(user)),
    fetchFriends: () => dispatch(getFriends()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);
