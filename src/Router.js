import React, {PropTypes} from 'react'
import {Scene, Router, Actions} from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import TrackList from './components/TrackList'
import TrackSuggestionForm from './components/TrackSuggestionForm'
import {requireAuth} from './components/common'
import {clearSuggestedTrack} from './actions/tracks'
import {logoutUser} from './actions/auth'
import {connect} from 'react-redux'

const RouterComponent = props => {
  return (
    <Router sceneStyle={{paddingTop: 65}}>
      <Scene key='auth'>
        <Scene key='login' component={LoginForm} title="Julia's Tracks" />
      </Scene>
      <Scene
        key='main'
        rightTitle='Logout'
        leftTitle='Suggest'
        onRight={() => props.logoutUser()}
        onLeft={() => Actions.trackSuggestion()}
        initial
      >
        <Scene
          key='trackList'
          component={requireAuth(TrackList)}
          title="Julia's tracks"
        />
        <Scene
          key='suggestionsList'
          component={requireAuth(TrackList)}
          title='Suggested tracks'
          initial
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

RouterComponent.PropTypes = {
  clearSuggestedTrack: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default connect(null, {clearSuggestedTrack, logoutUser})(RouterComponent)
