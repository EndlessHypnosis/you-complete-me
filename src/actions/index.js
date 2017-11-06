
export const addUser = (payload) => {
  return {
    type: 'ADD_USER',
    payload: payload
  }
}

export const fetchFeedback = () => {
  const request = fetch(`http://localhost:3100/api/v1/feedback`);
  return {
    type: 'FETCH_FEEDBACK',
    payload: request
  }
}
