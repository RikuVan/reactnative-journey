import React, { Component } from 'react'
import {Provider} from 'react-redux'
import Main from './Main'

import configureStore from './store'
import rootSaga from './sagas'

const store = configureStore()
store.runSaga(rootSaga)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App

