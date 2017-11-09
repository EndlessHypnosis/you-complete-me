import FireBaseUtils from '../utils/firebase';
import {
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  LOGOUT_FIREBASE_USER,
} from './types';


export function registerUser(user) {
  const request = FireBaseUtils.registerUser(user);
  return {
    type: REGISTER_FIREBASE_USER,
    payload: request,
  };
}

export function loginUser(user) {
  const request = FireBaseUtils.loginUser(user);
  return {
    type: LOGIN_FIREBASE_USER,
    payload: request,
  };
}

export function fetchUser() {
  const request = FireBaseUtils.fetchUser();
  return {
    type: FETCH_FIREBASE_USER,
    payload: request,
  };
}

export function updateUser(user) {
  const request = FireBaseUtils.updateUserProfile(user);
  return {
    type: UPDATE_FIREBASE_USER,
    payload: request,
  };
}

export function logoutUser(user) {
  const request = FireBaseUtils.logoutUser(user);
  return {
    type: LOGOUT_FIREBASE_USER,
    payload: request,
  };
}
