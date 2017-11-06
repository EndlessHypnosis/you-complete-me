
const pguser = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.payload;
    default:
      return state;
  }
}

export default pguser;