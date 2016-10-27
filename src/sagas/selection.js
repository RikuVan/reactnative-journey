import {loadArtistInfo, loadSimilarTracks} from './tracks'
import {fork, select} from 'redux-saga/effects'
import {getSelectionById} from '../selectors/selection'

import {replaceSpacesWithUnderscores} from '../reducers/selection'

export const getArtistKey = artist => `${replaceSpacesWithUnderscores(artist)}_info`
export const getTrackKey = track => `${replaceSpacesWithUnderscores(track)}_similar`

export function* selectItem ({payload}) {
  const {track, artist} = payload
  const trackKey = getTrackKey(track)
  const artistKey = getArtistKey(artist)
  const trackIdExists = yield select(getSelectionById(trackKey))
  const artistIdExists = yield select(getSelectionById(artistKey))
  if (!trackIdExists) {
    yield fork(loadSimilarTracks, trackKey, track, artist)
  }
  if (!artistIdExists) {
    yield fork(loadArtistInfo, artistKey, artist)
  }
}

