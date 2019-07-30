import axios from 'axios'

export const updateName = name => {
  return { type: 'UPDATE_NAME', name }
}
export const incrementSomething = () => {
  return { type: 'INCREMENT_SOMETHING' }
}

export const asyncAction = () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1"
  return dispatch => {
    return axios.get(url)
      .then((response) => {
        // If the API call went OK (HTTP status 200),
        // dispatch the success handler that came with the request
        dispatch(success(response))
      }).catch((error) => {
        // if get failed, dispatch the error action,
        // and send the error message
        dispatch(errorH(error))
      })
  }
}
export const success = response => {
  return { type: 'SUCCESS', response }
}
export const errorH = error => {
  return { type: 'ERROR', error }
}
