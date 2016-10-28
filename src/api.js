import axios from 'axios'
import firebase from 'firebase'
import {lastFMConfig, firebaseConfig} from './config'
const {LFM_USER, API_KEY, ROOT_URL} = lastFMConfig
import {compose, join, split, curry} from 'ramda'

const replaceSpaces = compose(join('+'), split(' '))

const queryMap = {
  top: () => 'chart.gettoptracks',
  searchByName: ({track, artist}) => artist ? `track.search&track=${track}&artist=${artist}` : `track.search&track=${track}`,
  artist: ({artist}) => `artist.getinfo&artist=${artist}`,
  similar: ({artist, track}) => `track.getsimilar&artist=${replaceSpaces(artist)}&track=${replaceSpaces(track)}`
}
export const api = {
  tracks: curry((query, params) => `${ROOT_URL}?method=${queryMap[query](params)}&user=${LFM_USER}&api_key=${API_KEY}&format=json`)
}

export const apiFn = type => (url, payload) => {
  let reqFn = () => axios[type](url)
  if (type === 'post' || type === 'put') {
    reqFn = () => axios[type](url, payload)
  }
  return reqFn().then(res => res)
}

export const apiGet = apiFn('get')
export const apiPut = apiFn('put')
export const apiPost = apiFn('post')
export const apiDelete = apiFn('delete')
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDB = firebaseApp.database()
export const selectionsAPI = firebaseDB.ref('tracks/selections/')

