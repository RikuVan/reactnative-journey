import {
  beginAction,
  completeAction,
  FETCH_SUCCESS,
  FETCH_FAIL
} from '../actions/api'
import {put, take, select} from 'redux-saga/effects'
import {FETCH_TOP_TRACKS, FETCH_TRACK} from '../actions/tracks'
import {
  AUTHORIZE_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER
} from '../actions/auth'
import {SELECT_TRACK} from '../actions/selection'
import {getSelectionById} from '../selectors/selection'
import {getArtistKey, getTrackKey} from './selection'

const beginAPiActionsWithKeys = [AUTHORIZE_USER, LOGIN_USER, FETCH_TOP_TRACKS, FETCH_TRACK]
const completionApiActionsWithKeys = [FETCH_SUCCESS, FETCH_FAIL, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE]

export function* watchLoading () {
  while (true) {
    const action = yield take('*')
    if (beginAPiActionsWithKeys.includes(action.type)) {
      yield put(beginAction(action.key || action.payload.key))
    }
    if (action.type === SELECT_TRACK) {
      const trackKey = getTrackKey(action.payload.track)
      const artistKey = getArtistKey(action.payload.artist)
      const trackIdExists = yield select(getSelectionById(trackKey))
      const artistIdExists = yield select(getSelectionById(artistKey))
      yield [
        trackIdExists ? null : put(beginAction(trackKey)),
        artistIdExists ? null : put(beginAction(artistKey))
      ]
    }
    if (completionApiActionsWithKeys.includes(action.type)) {
      yield put(completeAction(action.key || action.payload.key))
    }
  }
}
