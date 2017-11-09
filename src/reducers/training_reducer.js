
const training = (state = [], action) => {
  switch (action.type) {
    case 'STORE_TRAINING':
      return action.payload;
    default:
      return state;
  }
};

export default training;
