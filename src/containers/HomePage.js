import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../actions/homeActions';
import HomeComponent from '../components/Home/HomeComponent';

export class HomePage extends React.Component {
  render() {
    return (
      <HomeComponent
        getTeamPosts = {this.props.homeActions.getTeamPosts}
        createTeamPost = {this.props.homeActions.createTeamPost}
        updateTeamPost =  {this.props.homeActions.updateTeamPost}
        homeState = {this.props.homeState}
        authState = {this.props.authState}
      />
    );
  }
}

HomePage.propTypes = {
  homeActions: PropTypes.object.isRequired,
  homeState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    homeState: state.homeState,
    authState: state.authState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);