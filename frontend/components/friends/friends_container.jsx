import Friends from './friends.jsx';
import { addFriend, getFriends } from '../../actions/friendship_actions.js';
import { connect } from 'react-redux';
import { selectAllFriends } from '../../reducers/selectors.js';

const mapStateToProps = state => {
  return {
    friends: selectAllFriends(state.friends)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(addFriend(user)),
    fetchFriends: () => dispatch(getFriends()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);
