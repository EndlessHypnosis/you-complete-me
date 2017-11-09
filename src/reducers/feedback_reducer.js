
const feedback = (state = [], action) => {
  switch (action.type) {
    case 'STORE_FEEDBACK':
      return action.payload;
    default:
      return state;
  }
};

export default feedback;
