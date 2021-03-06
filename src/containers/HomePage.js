import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withApollo } from 'react-apollo';
import * as homeActions from '../actions/homeActions';
import HomeComponent from '../components/Home/HomeComponent';

export class HomePage extends React.Component {
  render() {
    return (
      <HomeComponent
        client = {this.props.client}
        getTeamPosts = {this.props.homeActions.getTeamPosts}
        createTeamPost = {this.props.homeActions.createTeamPost}
        updateTeamPost =  {this.props.homeActions.updateTeamPost}
        liveUpdatedTeamPost =  {this.props.homeActions.liveUpdatedTeamPost}
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
  client: PropTypes.object.isRequired,
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

export default compose(
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomePage);