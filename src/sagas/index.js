import {takeLatest} from 'redux-saga'
import {fork} from 'redux-saga/effects'
import {loadTracks, loadTrack, saveTrackSuggestion} from './tracks'
import {watchLoading} from './api'
import {selectItem} from './selection'
import {login, logout, watchAuthentication} from './auth'
import {SEND_TRACK_WITH_COMMENT} from '../actions/tracks'
import {LOGIN_USER, LOGOUT_USER, AUTHORIZE_USER} from '../actions/auth'
import {SELECT_TRACK} from '../actions/selection'

function* rootSaga () {
  yield [
    takeLatest(AUTHORIZE_USER, watchAuthentication),
    takeLatest(LOGIN_USER, login),
    takeLatest(LOGOUT_USER, logout),
    fork(loadTracks),
    fork(loadTrack),
    takeLatest(SELECT_TRACK, selectItem),
    takeLatest(SEND_TRACK_WITH_COMMENT, saveTrackSuggestion),
    fork(watchLoading)
  ]
}

export default rootSaga


