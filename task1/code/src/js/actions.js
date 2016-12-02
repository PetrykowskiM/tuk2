// Action structure is compliant with FSA (https://github.com/acdlite/flux-standard-action) or
// it's a function to support redux-thunk

import * as api from './api.js'

export const selectTool = tool => ({ type: 'SELECT_TOOL', payload: { tool } })
export const addTimer = timer => ({type: 'ADD_TIMER', payload: { timer } })
export const increaseTimer = (index, interval) => ({type: 'INCREASE_TIMER', payload: { index, interval } })

export const requestStart = (resource) => {type: 'REQUEST_START', {resource}}
export const requestSuccess = (data) => {type: 'REQUEST_SUCCESS', {data}}
export const requestError = (error) => {type: 'REQUEST_ERROR', {error}}

export const loadQuery = (resource) => (dispatch) => {
  dispatch(requestStart)
  api.request(resource)
    .then( r => dispatch(requestSuccess(r)) )
    .catch( e => dispatch(requestError(e)) )
}