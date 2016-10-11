import {
  FETCH_TOP_ARTISTS_SUCCESS,
  FETCH_FAIL
} from '../actions/api'
import {call, put} from 'redux-saga/effects'
import {api, apiGet} from '../api'

export function* loadArtists () {
  try {
    const artists = yield call(apiGet, api.artists('top'))
    yield put({type: FETCH_TOP_ARTISTS_SUCCESS, payload: artists.data})
  } catch (error) {
    yield put({type: FETCH_FAIL, error})
  }
}
