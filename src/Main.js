import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import configureStore from './store'
import rootSaga from './sagas'
import {authorizeUser, logoutUser} from './actions/auth'
import {View} from 'react-native'
import {Header, Spinner} from './components/common'
import ArtistList from './components/ArtistList'
import LoginForm from './components/LoginForm'

const store = configureStore({})
store.runSaga(rootSaga)

class Main extends Component {
  constructor () {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentWillMount () {
    this.props.authorizeUser()
  }
  handleLogout () {
    this.props.logoutUser()
  }
  renderBody () {
    switch (this.props.loggedIn) {
      case true:
        return <ArtistList />
      case false:
        return <LoginForm />
      default:
        return <LoginForm />
    }
  }
  render () {
    console.log("ehre", this.props)
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

const mapStateToProps = ({auth}) => ({...auth})
const mapDispatchToProps = dispatch => bindActionCreators({authorizeUser, logoutUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
