import firebase from 'firebase';
/* eslint-disable */
import { FIREBASE_CONFIG } from './firebase_config';
/* eslint-enable */

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();

const FireBaseUtils = {

  registerUser: user => firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(userInfo => userInfo)
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  logoutUser: () => firebaseAuth.signOut().then(() => ({
    success: 1,
    message: 'logout',
  })),

  fetchUser: () => new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      unsub(); // why does it seem like this function unsub is calling itself here? recursion?
      resolve(user);
    }, (error) => {
      reject(error);
    });
  }),

  loginUser: user => firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
  /* eslint-disable arrow-body-style */
    .then((userInfo) => {
      /* eslint-enable arrow-body-style */
      return userInfo;
    })
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  updateUserProfile: u => firebaseAuth.currentUser.updateProfile(u)
    .then(() => firebaseAuth.currentUser, error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  randomString: (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; i - 1) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },
};

export default FireBaseUtils;
