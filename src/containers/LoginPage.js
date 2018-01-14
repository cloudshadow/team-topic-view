import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../actions/authActions';
import LoginComponent from '../components/Login/LoginComponent';

export class LoginPage extends React.Component {
  render() {
    return (
      <LoginComponent
        login = {this.props.authActions.login}
      />
    );
  }
}

LoginPage.propTypes = {
  authActions: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    authState: state.authState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);