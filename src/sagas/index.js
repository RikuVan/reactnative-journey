import {takeLatest} from 'redux-saga'
import {loadArtists} from './artists'
import {login, logout, watchAuthentication} from './auth'
import {FETCH_TOP_ARTISTS} from '../actions/api'
import {LOGIN_USER, LOGOUT_USER, AUTHORIZE_USER} from '../actions/auth'

function* rootSaga () {
  yield [
    takeLatest(FETCH_TOP_ARTISTS, loadArtists),
    takeLatest(LOGIN_USER, login),
    takeLatest(LOGOUT_USER, logout),
    takeLatest(AUTHORIZE_USER, watchAuthentication)
  ]
}

export default rootSaga
