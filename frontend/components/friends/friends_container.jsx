import Friends from './friends.jsx';
import { addFriend, getFriends, searchFriends, clearSearch, searchUsers } from '../../actions/friendship_actions.js';
import { connect } from 'react-redux';
import { selectAllFriends } from '../../reducers/selectors.js';

const mapStateToProps = state => {
  return {
    friends: selectAllFriends(state.friends.users),
    search: selectAllFriends(state.friends.userResult),
    errors: state.friends.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processFriendForm: (user) => dispatch(addFriend(user)),
    fetchFriends: () => dispatch(getFriends()),
    searchFriends: (query) => dispatch(searchFriends(query)),
    clearSearch: () => dispatch(clearSearch()),
    searchUsers: (query) => dispatch(searchUsers(query))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);
