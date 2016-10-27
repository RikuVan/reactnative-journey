import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_FAILURE
} from '../actions/auth'
import {firebaseAuth} from '../api'
import {call, put, take} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {isEmpty} from 'ramda'
import {Actions} from 'react-native-router-flux'

export function* login ({payload}) {
  const {key, email, password} = payload
  try {
    const user = yield call([firebaseAuth, firebaseAuth.signInWithEmailAndPassword], email, password)
    if (user) {
      yield [
        put({type: LOGIN_USER_SUCCESS, payload: {key, user}}),
        call(Actions.main)
      ]
      return user
    }
  } catch (error) {
    const {message} = error
    yield put({type: LOGIN_USER_FAILURE, payload: {key, error: message}})
    return error
  }
}

export function* logout () {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut])
    yield [
      put({type: LOGOUT_USER_SUCCESS}),
      call(Actions.auth)
    ]
    return null
  } catch (error) {
    yield put({type: LOGOUT_USER_FAILURE, payload: {error}})
    return error
  }
}

function subscribe () {
  return eventChannel(emit => firebaseAuth.onAuthStateChanged((user) => emit(user || {})))
}

export function* watchAuthentication () {
  const channel = yield call(subscribe)
  while (true) {
    let user = yield take(channel)
    if (user && !isEmpty(user)) {
      try {
        yield put({type: LOGIN_USER_SUCCESS, payload: {key: 'getUser', user}})
        return user
      } catch (error) {
        yield [
          put({type: LOGIN_USER_FAILURE, payload: {error}}),
          call(Actions.auth)
        ]
        return error
      }
    }
    try {
      yield [
        put({type: LOGOUT_USER_SUCCESS}),
        call(Actions.auth)
      ]
      return null
    } catch (error) {
      yield put({type: LOGOUT_USER_FAILURE, payload: {error}})
      return error
    }
  }
}


