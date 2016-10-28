import React from 'react'
import {Scene, Router, Actions} from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import TrackList from './components/TrackList'
import TrackSuggestionForm from './components/TrackSuggestionForm'
import {requireAuth} from './components/common'

const RouterComponent = () => {
  return (
    <Router sceneStyle={{paddingTop: 65}}>
      <Scene key='auth'>
        <Scene key='login' component={LoginForm} title="Julia's Tracks" />
      </Scene>
      <Scene key='main' initial>
        <Scene
          key='trackList'
          component={requireAuth(TrackList)}
          title="Julia's tracks"
          rightTitle='Suggest'
          onRight={() => Actions.trackSuggestion()}
          initial />
        <Scene
          key='trackSuggestion'
          component={TrackSuggestionForm}
          title='Suggest a track'
        />
      </Scene>
    </Router>
  )
}

export default RouterComponent
