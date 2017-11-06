
export const addUser = (payload) => {
  return {
    type: 'ADD_USER',
    payload: payload
  }
}

export const storeFeedback = (payload) => {
  return {
    type: 'STORE_FEEDBACK',
    payload: payload
  }
}

export const storeSchedules = (payload) => {
  return {
    type: 'STORE_SCHEDULES',
    payload: payload
  }
}

export const storeTraining = (payload) => {
  return {
    type: 'STORE_TRAINING',
    payload: payload
  }
}
