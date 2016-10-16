import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import configureStore from './store'
import rootSaga from './sagas'
import {authorizeUser, logoutUser} from './actions/auth'
import {beginAction} from './actions/api'
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
    this.props.beginAction('getUser')
    this.props.authorizeUser()
  }
  handleLogout () {
    this.props.logoutUser()
  }
  renderBody () {
    if (Object.keys(this.props.loading).length > 0) {
      return <Spinner />
    } else if (this.props.loggedIn) {
      return <ArtistList />
    } else {
      return <LoginForm />
    }
  }
  render () {
    console.log("auth", this.props.loggedIn)
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
const mapDispatchToProps = dispatch => bindActionCreators({authorizeUser, logoutUser, beginAction}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
