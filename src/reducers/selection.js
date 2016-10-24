import {
  SELECT_TRACK
} from '../actions/selection'
import {compose, split, join} from 'ramda'

export const replaceSpacesWithUnderscores = compose(join('_'), split(' '))
export const createTrackId = (artist, track) => `${replaceSpacesWithUnderscores(track)}_by_${replaceSpacesWithUnderscores(artist)}`

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_TRACK:
      return createTrackId(action.payload.track, action.payload.artist)
    default:
      return state
  }
}
