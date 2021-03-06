import {
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  LOGOUT_FIREBASE_USER,
} from '../actions/types';

/* eslint-disable camelcase */
const firebase_user = (state = null, action) => {
  switch (action.type) {
    case FETCH_FIREBASE_USER:
      return action.payload;
    case LOGOUT_FIREBASE_USER:
      return action.payload;
    case REGISTER_FIREBASE_USER:
      return action.payload;
    case LOGIN_FIREBASE_USER:
      return action.payload;
    case UPDATE_FIREBASE_USER:
      return action.payload;
    default:
      return state;
  }
};

export default firebase_user;
/* eslint-enable camelcase */
