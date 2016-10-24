import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import configureStore from './store'
import rootSaga from './sagas'
import {authorizeUser, logoutUser} from './actions/auth'
import {View} from 'react-native'
import {Header, Spinner} from './components/common'
import TrackList from './components/TrackList'
import LoginForm from './components/LoginForm'

const store = configureStore({})
store.runSaga(rootSaga)

class Main extends Component {
  constructor () {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentWillMount () {
    this.props.authorizeUser('getUser')
  }
  handleLogout () {
    this.props.logoutUser()
  }
  renderBody () {
    if (this.props.loading.getUser) {
      return <Spinner />
    } else if (this.props.loggedIn) {
      return <TrackList />
    } else {
      return <LoginForm />
    }
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <Header
          title={'Julia\'s Artists'}
          handleLogout={this.handleLogout}
          loggedIn={this.props.loggedIn}
        />
        {this.renderBody()}
      </View>
    )
  }
}

const mapStateToProps = ({auth, api}) => ({...auth, ...api})
const mapDispatchToProps = dispatch => bindActionCreators({
  authorizeUser, logoutUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
