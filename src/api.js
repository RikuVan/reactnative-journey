import axios from 'axios'
const LFM_USER = 'rikuVan'
const API_KEY = '86bc1b7dec71bced88cc3fffcf83a129'
const ROOT_URL = 'https://ws.audioscrobbler.com/2.0/'

const queryMap = {
  top: 'chart.gettopartists'
}

export const api = {
  artists: query => `${ROOT_URL}?method=${queryMap[query]}&user=${LFM_USER}&api_key=${API_KEY}&format=json`
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
