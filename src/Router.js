import React, {PropTypes} from 'react'
import {Scene, Router, Actions} from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import TrackList from './components/TrackList'
import TrackSuggestionForm from './components/TrackSuggestionForm'
import {requireAuth} from './components/common'
import addTabs from './components/Tabbar'
import {clearSuggestedTrack} from './actions/tracks'
import {logoutUser} from './actions/auth'
import {connect} from 'react-redux'

const RouterComponent = props => {
  return (
    <Router sceneStyle={{paddingTop: 65}}>
      <Scene
        key='auth'
        navigationBarStyle={{backgroundColor: '#FF5E3A'}}
      >
        <Scene key='login' component={LoginForm} title="Julia's Tracks" />
      </Scene>
      <Scene
        key='main'
        navigationBarStyle={{backgroundColor: '#FF9500'}}
        backButtonTextStyle={{color: 'white'}}
        backTitle='Back'
        rightTitle='Logout'
        rightButtonTextStyle={{color: 'white'}}
        onRight={() => props.logoutUser()}
        initial
      >
        <Scene
          key='trackList'
          component={requireAuth(addTabs(TrackList))}
          title="Julia's tracks"
          titleStyle={{color: 'white', fontWeight: 'bold'}}
          initial
        />
        <Scene
          key='suggestionsList'
          component={requireAuth(addTabs(TrackList))}
          title='Suggested tracks'
        />
        <Scene
          key='trackSuggestion'
          component={TrackSuggestionForm}
          title='Suggest a track'
          onBack={() => {
            props.clearSuggestedTrack('searchForTrack')
            Actions.pop()
          }}
        />
      </Scene>
    </Router>
  )
}

RouterComponent.propTypes = {
  clearSuggestedTrack: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default connect(null, {clearSuggestedTrack, logoutUser})(RouterComponent)
