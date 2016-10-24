import {loadArtistInfo, loadSimilarTracks} from './tracks'
import {fork, select} from 'redux-saga/effects'
import {path} from 'ramda'
import {createTrackId} from '../reducers/selection'
const getSelectionById = id => path(['api', id, 'data'])

export function* selectItem ({payload}) {
  const {track, artist} = payload
  const idExists = yield select(getSelectionById(createTrackId(artist, track)))
  if (!idExists) {
    yield fork(loadArtistInfo, artist)
    yield fork(loadSimilarTracks, track, artist)
  }
  return
}
