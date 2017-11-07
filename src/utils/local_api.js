
export const getPGUser = (uid) => {
  return fetch(`http://localhost:3100/api/v1/users/${uid}`)
    .then(results => results.json())
    .then(users => {
      // console.log('WHAT IS USER A:', users[0]);

      return users[0];
    });
};

export const getFeedback = (id) => {
  return fetch(`http://localhost:3100/api/v1/feedback/${id}`)
    .then(results => results.json());
};

export const getSchedules = (id) => {
  return fetch(`http://localhost:3100/api/v1/schedules/${id}`)
    .then(results => results.json());
};

export const getAllTraining = () => {
  return fetch(`http://localhost:3100/api/v1/training`)
    .then(results => results.json());
};

export const saveBooking = (payload) => {
  return fetch(`http://localhost:3100/api/v1/training`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mentor_user_id: payload.mentor_user_id,
      scheduled_for_date: payload.scheduled_for_date,
      length_in_minutes: payload.length_in_minutes
    })
  })
  .then(results => results.json());
}
