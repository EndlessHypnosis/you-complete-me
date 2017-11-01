import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import { reducer as notifications } from 'react-notification-system-redux';


const rootReducer = combineReducers({
  currentUser: FireBaseUserReducer,
  notifications
});

export default rootReducer;
