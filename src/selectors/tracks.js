import {pathOr, compose, head, defaultTo, prop} from 'ramda'

const tracksPath = ['api', 'topTracks', 'data', 'tracks', 'track']
const trackSuggestionPath = ['form', 'trackSuggestion', 'values']
export const getTracks = pathOr([], tracksPath)
export const getSimilarTracks = trackId => pathOr(null, ['api', `${trackId}_similar`, 'data', 'similartracks'])
export const getArtistInfo = artistId => pathOr(null, ['api', `${artistId}_info`, 'data', 'artist'])
export const getTrackMatches = pathOr(null, ['api', 'searchForTrack', 'data', 'results', 'trackmatches', 'track'])
export const getTrackName = pathOr('', trackSuggestionPath.concat('track'))
export const getArtist = pathOr('', trackSuggestionPath.concat('artist'))
export const getTrackIdFromList = pathOr(null, trackSuggestionPath.concat('trackFromList'))
export const getComment = pathOr('', trackSuggestionPath.concat('comment'))
export const getDefaultTrackIdFromList = compose(prop('mbid'), head, defaultTo([{mbid: null}]), getTrackMatches)



