import {loadArtistInfo, loadSimilarTracks, getArtistKey, getTrackKey} from './tracks'
import {fork, select} from 'redux-saga/effects'
import {getSelectionById} from '../selectors/selection'

export function* selectItem ({payload}) {
  const {track, artist} = payload
  const trackIdExists = yield select(getSelectionById(getTrackKey(track)))
  const artistIdExists = yield select(getSelectionById(getArtistKey(artist)))
  if (!trackIdExists) {
    yield fork(loadSimilarTracks, track, artist)
  }
  if (!artistIdExists) {
    yield fork(loadArtistInfo, artist)
  }
}

