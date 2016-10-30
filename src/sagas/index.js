import {takeLatest, takeEvery} from 'redux-saga'
import {fork} from 'redux-saga/effects'
import {loadTracks, loadTrack, saveTrackSuggestion, watchSuggestionsList, loadTrackById} from './tracks'
import {watchLoading} from './api'
import {selectItem} from './selection'
import {login, logout, watchAuthentication} from './auth'
import {SEND_TRACK_WITH_COMMENT, FETCH_SUGGESTED_TRACKS, FETCH_TRACK_BY_ID} from '../actions/tracks'
import {LOGIN_USER, LOGOUT_USER, AUTHORIZE_USER} from '../actions/auth'
import {SELECT_TRACK} from '../actions/selection'

function* rootSaga () {
  yield [
    takeLatest(AUTHORIZE_USER, watchAuthentication),
    takeLatest(LOGIN_USER, login),
    takeLatest(LOGOUT_USER, logout),
    fork(loadTracks),
    fork(loadTrack),
    takeEvery(FETCH_TRACK_BY_ID, loadTrackById),
    takeLatest(SELECT_TRACK, selectItem),
    takeLatest(SEND_TRACK_WITH_COMMENT, saveTrackSuggestion),
    takeLatest(FETCH_SUGGESTED_TRACKS, watchSuggestionsList),
    fork(watchLoading)
  ]
}

export default rootSaga


