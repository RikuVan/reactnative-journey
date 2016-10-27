import React, { Component } from 'react'
import {Provider} from 'react-redux'
import Router from './Router'

import configureStore from './store'
import rootSaga from './sagas'

const store = configureStore()
store.runSaga(rootSaga)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App

