import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS
} from '../actions/auth'
import {firebaseAuth} from '../api'
import {call, put, take} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

export function* login ({email, password}) {
  try {
    const user = yield call([firebaseAuth, firebaseAuth.signInWithEmailAndPassword], email, password)
    if (user) {
      yield put({type: LOGIN_USER_SUCCESS, payload: user})
      return user
    }
  } catch (e) {
    console.log(e)
  }
}

export function* logout () {
  try {
    call([firebaseAuth, firebaseAuth.signOut])
    yield put({type: LOGOUT_USER_SUCCESS})
    return null
  } catch (e) {
    console.log(e)
  }
}

function subscribe () {
  return eventChannel(emit => firebaseAuth.onAuthStateChanged((user) => emit(user)))
}

export function* watchAuthentication () {
  const channel = yield call(subscribe)
  while (true) {
    let user = yield take(channel)
    if (user) {
      console.log("user", user)
      yield put({type: LOGIN_USER_SUCCESS, payload: user})
      return user
    }
    console.log("nouser")
    yield put({type: LOGOUT_USER_SUCCESS})
    return null
  }
}



