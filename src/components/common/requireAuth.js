import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Spinner} from './Spinner'
import {authorizeUser} from '../../actions/auth'
import {getAuthState} from '../../selectors/auth'

const requireAuth = El => {
  class AuthCheck extends Component {
    static propTypes = {
      loggedIn: PropTypes.bool.isRequired,
    }

    componentWillMount () {
      this.props.authorizeUser('getUser')
    }

    render() {
      return this.props.loggedIn ? <El {...this.props} /> : <Spinner />;
    }
  }
  const mapStateToProps = state => ({loggedIn: getAuthState(state)});
  return connect(mapStateToProps, {authorizeUser})(AuthCheck);
};

export {requireAuth}
