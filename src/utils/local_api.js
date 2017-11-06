
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
