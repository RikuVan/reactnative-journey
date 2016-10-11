import React, { Component } from 'react'
import {
  View
} from 'react-native'
import Header from './components/Header'
import ArtistList from './components/ArtistList'

import configureStore from './store'
import rootSaga from './sagas'

const store = configureStore({})
store.runSaga(rootSaga)

class Main extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <Header title={'Julia\'s Artists'} />
        <ArtistList />
      </View>
    )
  }
}

export default Main
