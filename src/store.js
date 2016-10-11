import {createStore, combineReducers, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'

const reducer = combineReducers(reducers)

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(reducer, initialState, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run
  }
}

export default configureStore
