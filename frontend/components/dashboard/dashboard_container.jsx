import Dashboard from './dashboard.jsx';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions.js';
import { getBills } from '../../actions/bill_actions.js';
import { selectAllBills } from '../../reducers/selectors.js';


const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    bills: state.bills.billList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getBills: () => dispatch(getBills()),

  };

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
