import {combineReducers} from 'redux'

let queryDefinition = [
  {
    name: 'Population Pyramid',
    endpoint: 'PYRAMID',
    page: 'PYRAMID'
  },
  {
    name: 'Population Density',
    endpoint: 'DENSITY',
    page: 'MAP'
  },
  {
    name: 'Persons BMI',
    endpoint: 'BMI',
    page: 'MAP'
  },
  {
    name: 'Persons Age',
    endpoint: 'OLDEST',
    page: 'MAP'
  },
  {
    name: 'Baby Size',
    endpoint: 'BABIES',
    page: 'MAP'
  },
  {
    name: 'Diversity',
    endpoint: 'DIVERSITY',
    page: 'DIVERSITY',
    default: 1991
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

const page = (state = 'MAP', action) => {
  switch(action.type){
    case 'SHOW_MAP':
       return 'MAP';
   case 'SHOW_DIVERSITY':
      return 'DIVERSITY';
    case 'SHOW_PYRAMID':
        return 'PYRAMID';
    default:
      return state
  }
}

export default combineReducers({
  queries,
  page,
  show
})
