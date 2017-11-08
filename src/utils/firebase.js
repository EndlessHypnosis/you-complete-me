import firebase from 'firebase';
import { FIREBASE_CONFIG } from './firebase_config';

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
    .then(userInfo => {
      return userInfo;
    })
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  updateUserProfile: u => firebaseAuth.currentUser.updateProfile(u).then(() => firebaseAuth.currentUser, error => ({
    errorCode: error.code,
    errorMessage: error.message,
  })),

  randomString: (length) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
};

export default FireBaseUtils;
