import {
  fetchFail,
  fetchSuccess
} from '../actions/api'
import {Actions} from 'react-native-router-flux'
import {FETCH_TOP_TRACKS, FETCH_TRACK, FETCH_TRACK_BY_ID} from '../actions/tracks'
import {call, put, take} from 'redux-saga/effects'
import {api, apiGet, selectionsAPI} from '../api'
import {eventChannel} from 'redux-saga'
import {isEmpty, map, compose, keys} from 'ramda'
import {normalizeTracks} from './helpers'

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
export const loadTrack = attemptRequest.bind(null, FETCH_TRACK, apiGet, api.tracks('byName'))
export const loadTrackById = attemptRequest.bind(null, FETCH_TRACK_BY_ID, apiGet, api.tracks('byId'))

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
    yield call([Actions, Actions.suggestionsList])
  } catch (error) {
    yield put(fetchFail(key, error))
  }
}

function subscribe () {
  return eventChannel(emit => selectionsAPI.on('value', snapshot => emit(snapshot.val() || {})))
}

export function* watchSuggestionsList () {
  const key = 'suggestionsList'
  const channel = yield call(subscribe)
  while (true) {
    let list = yield take(channel)
    const mapMbids = map((key) => list[key].mbid)
    const mbidList = compose(mapMbids, keys)(list)
    if (mbidList && !isEmpty(mbidList)) {
      try {
        const tracks = yield map(mbid => call(apiGet, api.tracks('byId', {mbid})), mbidList)
        yield put(fetchSuccess(key, {tracks: normalizeTracks(tracks)}))
        return tracks
      } catch (error) {
        yield put(fetchFail(key, error))
        return error
      }
    }
  }
}






