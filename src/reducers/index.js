import api from './api'
import auth from './auth'
import selection from './selection'
import {reducer as formReducer} from 'redux-form'

export default {
  api,
  auth,
  form: formReducer,
  selected: selection
}
