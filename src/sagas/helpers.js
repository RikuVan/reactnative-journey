import {replaceSpacesWithUnderscores} from '../reducers/selection'
import {compose, map, assoc, path, omit} from 'ramda'

export const getArtistKey = artist => `${replaceSpacesWithUnderscores(artist)}_info`
export const getTrackKey = track => `${replaceSpacesWithUnderscores(track)}_similar`
export const normalizeTracks = tracks => {
  return compose(
    map(track => omit(['album'], track)),
    map(track => assoc('image', path(['album', 'image'], track), track)),
    map(track => path(['data', 'track'], track))
  )(tracks)
}
