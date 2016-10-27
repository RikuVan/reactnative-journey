import {
  fetchFail,
  fetchSuccess
} from '../actions/api'
import {FETCH_TOP_TRACKS, FETCH_TRACK} from '../actions/tracks'
import {call, put, take} from 'redux-saga/effects'
import {api, apiGet, selectionsAPI} from '../api'

function* attemptRequest (actionType, apiFn, url) {
  const {payload} = yield take(actionType)
  let {key, ...rest} = payload
  const requestWithParams = url(rest)
  try {
    const response = yield call(apiFn, requestWithParams)
    yield put(fetchSuccess(key, response.data))
  } catch (error) {
    yield put(fetchFail(key, error))
  }
}

export const loadTracks = attemptRequest.bind(null, FETCH_TOP_TRACKS, apiGet, api.tracks('top'))
export const loadTrack = attemptRequest.bind(null, FETCH_TRACK, apiGet, api.tracks('searchByName'))

export function* loadArtistInfo (key, artist) {
  try {
    const artistInfo = yield call(apiGet, api.tracks('artist', {artist}))
    yield put(fetchSuccess(key, artistInfo.data))
  } catch (error) {
    yield put(fetchFail(key, error))
  }
}

export function* loadSimilarTracks (key, track, artist) {
  try {
    const similarTracks = yield call(apiGet, api.tracks('similar', {track, artist}))
    yield put(fetchSuccess(key, similarTracks.data))
  } catch (error) {
    yield put(fetchFail(key, error))
  }
}

export function* saveTrackSuggestion ({payload}) {
  const {key, mbid, suggestedBy, comment} = payload
  try {
    const saved = yield call([selectionsAPI, selectionsAPI.push], {mbid, comment, suggestedBy})
    yield put(fetchSuccess(key, saved.data))
  } catch (error) {
    yield put(fetchFail(key, error))
  }
}



