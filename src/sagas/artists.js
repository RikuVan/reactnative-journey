import {
  fetchFail,
  fetchSuccess
} from '../actions/api'
import {call, put} from 'redux-saga/effects'
import {api, apiGet} from '../api'

const key = 'topArtists'

export function* loadArtists () {
  try {
    const artists = yield call(apiGet, api.artists('top'))
    yield put(fetchSuccess(key, artists.data))
  } catch (error) {
    yield put(fetchFail(key, error))
  }
}
