import {
  fetchFail,
  fetchSuccess,
  beginAction,
  completeAction,
  FETCH_SUCCESS,
  FETCH_FAIL,
  FETCH_TOP_TRACKS
} from '../actions/api'
import {
  AUTHORIZE_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER
} from '../actions/auth'
import {call, put, take, select} from 'redux-saga/effects'
import {api, apiGet} from '../api'
import {replaceSpacesWithUnderscores} from '../reducers/selection'
import {SELECT_TRACK} from '../actions/selection'
import {getSelectionById} from '../selectors/selection'

export const getArtistKey = artist => `${replaceSpacesWithUnderscores(artist)}_info`
export const getTrackKey = track => `${replaceSpacesWithUnderscores(track)}_similar`

const beginAPiActionsWithKeys = [AUTHORIZE_USER, LOGIN_USER, FETCH_TOP_TRACKS]
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

export function* loadTracks ({payload}) {
  try {
    const tracks = yield call(apiGet, api.tracks('top'))
    yield put(fetchSuccess(payload.key, tracks.data))
  } catch (error) {
    yield put(fetchFail(payload.key, error))
  }
}

export function* loadArtistInfo (artist) {
  const key = getArtistKey(artist)
  try {
    const artistInfo = yield call(apiGet, api.tracks('artist', {artist}))
    yield put(fetchSuccess(key, artistInfo.data))
  } catch (error) {
    yield put(fetchFail(key, error))
  }
}

export function* loadSimilarTracks (track, artist) {
  const key = getTrackKey(track)
  try {
    const similarTracks = yield call(apiGet, api.tracks('similar', {track, artist}))
    yield put(fetchSuccess(key, similarTracks.data))
  } catch (error) {
    yield put(fetchFail(key, error))
  }
}



