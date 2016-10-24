import {pathOr} from 'ramda'

const tracksPath = ['api', 'topTracks', 'data', 'tracks', 'track']
export const getTracks = pathOr([], tracksPath)
