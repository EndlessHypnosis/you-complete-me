
/* eslint-disable arrow-body-style */
export const addUser = (payload) => {
  return {
    type: 'ADD_USER',
    payload,
  };
};

export const storeFeedback = (payload) => {
  return {
    type: 'STORE_FEEDBACK',
    payload,
  };
};

export const storeSchedules = (payload) => {
  return {
    type: 'STORE_SCHEDULES',
    payload,
  };
};

export const storeTraining = (payload) => {
  return {
    type: 'STORE_TRAINING',
    payload,
  };
};
/* eslint-enable arrow-body-style */
