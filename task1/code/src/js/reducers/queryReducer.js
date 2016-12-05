import {combineReducers} from 'redux'

let queryDefinition = [
  {
    name: 'Population Pyramid',
    endpoint: 'PYRAMID'
  },
  {
    name: 'Population Density',
    endpoint: 'DENSITY'
  },
  {
    name: 'Persons BMI',
    endpoint: 'BMI'
  },
  {
    name: 'Persons Age',
    endpoint: 'OLDEST'
  },
  {
    name: 'Baby Size',
    endpoint: 'BABIES'
  }
]

const queries = (state = queryDefinition, action) => {
  return state
}

const show = (state = false, action) => {
  switch(action.type){
    case 'SHOW_QUERIES':
      return true
    case 'HIDE_QUERIES':
      return false
    default:
      return state
  }

}
export default combineReducers({
  queries,
  show
})
