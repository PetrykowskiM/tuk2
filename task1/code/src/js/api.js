import fetch from 'isomorphic-fetch'

const API_URL = 'http://localhost:8000/api'

// Similar to:
// http://stackoverflow.com/questions/29473426/fetch-reject-promise-with-json-error-object
function fetchJson(url, request) {
  const finalRequest = request
    ? {
      ...request,
      body: JSON.stringify(request.body),
      headers: {
        ...request.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    : {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }

  return fetch(url, finalRequest).then(
    (response) => {
      console.log("responding with ", response)
      if (response.status >= 200 && response.status < 305) {
        console.log("success")
        return response.json().then(Promise.resolve.bind(Promise))
      }
      // Reject other status
      return response.json().then(Promise.reject.bind(Promise))
    },
    error => Promise.reject(error) // Network or connection failure
  )
}

export function getExample(query) {
  return fetchJson(`${API_URL}/get/path?query=${query}`)
}

export function postExample(userID, password) {
  return fetchJson(`${API_URL}/login`, {
    method: 'POST',
    body: {
      userID,
      password,
    },
  })
}

export function getBabies() {
  return fetchJson(`${API_URL}/babies`)
}

export function getBmi() {
  return fetchJson(`${API_URL}/bmi`)
}
export function getDensity() {
  return fetchJson(`${API_URL}/density`)
}
export function getOldest() {
  return fetchJson(`${API_URL}/oldest`)
}

export function getPyramid(){
  return fetchJson(`${API_URL}/pyramid`)
}

export function getDiversity(year){
  return fetchJson(`${API_URL}/diverse/`+year)
}



export const request = (resource) => {
  switch(resource){
    case 'BABIES':
      return getBabies()
    case 'BMI':
      return getBmi()
    case 'DENSITY':
      return getDensity()
    case 'OLDEST':
      return getOldest()
    case 'PYRAMID':
      return getPyramid()
      case 'DIVERSITY':
        return getDiversity()
    default:
      return new Promise( (res, rej) => res() )
  }
}

export const requestDiversity = (year) => {
  return getDiversity(year)
}
