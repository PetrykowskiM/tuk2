// Action structure is compliant with FSA (https://github.com/acdlite/flux-standard-action) or
// it's a function to support redux-thunk

import * as api from './api.js'

export const selectTool = tool => ({ type: 'SELECT_TOOL', payload: { tool } })
export const addTimer = timer => ({type: 'ADD_TIMER', payload: { timer } })
export const increaseTimer = (index, interval) => ({type: 'INCREASE_TIMER', payload: { index, interval } })

export const showQueries = () => ({type: 'SHOW_QUERIES' })
export const hideQueries = () => ({type: 'HIDE_QUERIES' })

export const requestStart = (resource) => ({type: 'REQUEST_START', payload: {resource}})
export const requestSuccess = (data) => ({type: 'REQUEST_SUCCESS', payload: {data}})
export const requestError = (error) => ({type: 'REQUEST_ERROR', payload: {error}})

export const loadQuery = (resource) => ((dispatch) => {
  dispatch(requestStart(resource))
  return api.request(resource)
    .then( r => {
      console.log(r)
      dispatch(requestSuccess(r.result))
    })
    .catch( e => { console.log("got to errro", e); dispatch(requestError(e)) })
})

