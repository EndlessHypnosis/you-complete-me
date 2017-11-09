
const schedule = (state = [], action) => {
  switch (action.type) {
    case 'STORE_SCHEDULES':
      return action.payload;
    default:
      return state;
  }
};

export default schedule;
