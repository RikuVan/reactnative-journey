import {pathOr} from 'ramda'

const tracksPath = ['api', 'topTracks', 'data', 'tracks', 'track']
export const getTracks = pathOr([], tracksPath)
export const getSimilarTracks = trackId => pathOr(null, ['api', `${trackId}_similar`, 'data', 'similartracks'])
export const getArtistInfo = artistId => pathOr(null, ['api', `${artistId}_info`, 'data', 'artist'])
