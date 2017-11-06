
export const fetchUser = (uid) => {
  const request = fetch(`http://localhost:3100/api/v1/users/${uid}`);
  return {
    type: 'FETCH_USER',
    payload: request
  }
}

export const fetchFeedback = () => {
  const request = fetch(`http://localhost:3100/api/v1/feedback`);
  return {
    type: 'FETCH_FEEDBACK',
    payload: request
  }
}
