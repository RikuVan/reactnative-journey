import {
  SELECT_TRACK
} from '../actions/selection'
import {compose, split, join, ifElse, equals, always} from 'ramda'

export const replaceSpacesWithUnderscores = compose(join('_'), split(' '))
export const createTrackId = (artist, track) => `${replaceSpacesWithUnderscores(track)}_by_${replaceSpacesWithUnderscores(artist)}`

const setOrUnset = id => ifElse(
  equals(id),
  always(null),
  always(id)
)
export default (state = '', action) => {
  switch (action.type) {
    case SELECT_TRACK:
      return setOrUnset(createTrackId(action.payload.track, action.payload.artist))(state)
    default:
      return state
  }
}
