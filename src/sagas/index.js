import {takeLatest} from 'redux-saga'
import {fork} from 'redux-saga/effects'
import {loadTracks, watchLoading} from './tracks'
import {selectItem} from './selection'
import {login, logout, watchAuthentication} from './auth'
import {FETCH_TOP_TRACKS} from '../actions/api'
import {LOGIN_USER, LOGOUT_USER, AUTHORIZE_USER} from '../actions/auth'
import {SELECT_TRACK} from '../actions/selection'

function* rootSaga () {
  yield [
    takeLatest(FETCH_TOP_TRACKS, loadTracks),
    takeLatest(LOGIN_USER, login),
    takeLatest(LOGOUT_USER, logout),
    takeLatest(AUTHORIZE_USER, watchAuthentication),
    takeLatest(SELECT_TRACK, selectItem),
    fork(watchLoading)
  ]
}

export default rootSaga
