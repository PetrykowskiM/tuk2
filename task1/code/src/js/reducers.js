import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import timer from './reducers/timerReducer'
import settings from './reducers/settingsReducer'
import queries from './reducers/queryReducer'
import data from './reducers/dataReducer'

const lastAction = (state = null, action) => action

export default combineReducers({
  timer,
  settings,
  lastAction,
  queries,
  data,
  routing: routerReducer,
})
