
export const addUser = (payload) => {
  return {
    type: 'ADD_USER',
    payload: payload
  }
}

export const fetchFeedback = (payload) => {
  return {
    type: 'FETCH_FEEDBACK',
    payload: payload
  }
}
