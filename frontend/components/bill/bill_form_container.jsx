import BillForm from './bill_form.jsx';
import { searchFriends, clearSearch } from '../../actions/friendship_actions.js';
import { createBill } from '../../actions/bill_actions.js';
import { connect } from 'react-redux';
import { selectAllFriends } from '../../reducers/selectors.js';

// make sure bills container is listening to the right pieces of state
// the bills reducer will now have friend actions and bill actions.

const mapStateToProps = state => {
  return {
    search: selectAllFriends(state.friends.userResult),
    errors: state.friends.errors,
    friends: state.friends.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processBillForm: (bill) => dispatch(createBill(bill)),
    searchFriends: (query) => dispatch(searchFriends(query)),
    clearSearch: () => dispatch(clearSearch())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillForm);
