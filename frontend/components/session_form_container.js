import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../actions/session_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: !!state.session.currentUser,
    errors: state.session.errors,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      processForm: (user) => dispatch(login(user))
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
