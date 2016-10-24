import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_FAILURE
} from '../actions/auth'
import {beginAction, completeAction} from '../actions/api'
import {firebaseAuth} from '../api'
import {call, put, take} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {isEmpty} from 'ramda'

export function* login ({key, email, password}) {
  try {
    const user = yield call([firebaseAuth, firebaseAuth.signInWithEmailAndPassword], email, password)
    if (user) {
      yield put({type: LOGIN_USER_SUCCESS, payload: {key, user}})
      return user
    }
  } catch (error) {
    yield put({type: LOGIN_USER_FAILURE, payload: {error}})
    return null
  }
}

export function* logout () {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut])
    yield put({type: LOGOUT_USER_SUCCESS})
    return null
  } catch (error) {
    yield put({type: LOGOUT_USER_FAILURE, payload: {error}})
    return null
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
        yield put({type: LOGIN_USER_FAILURE, payload: {error}})
        return null
      }
    }
    try {
      yield put({type: LOGOUT_USER_SUCCESS})
      return null
    } catch (error) {
      yield put({type: LOGOUT_USER_FAILURE, payload: {error}})
      return null
    } finally {
      yield put(completeAction('getUser'))
    }
  }
}


