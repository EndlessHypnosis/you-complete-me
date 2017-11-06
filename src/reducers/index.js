import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import FireBaseUserReducer from './firebase_user_reducer';
import FeedbackReducer from './feedback_reducer';
import PGUserReducer from './pguser_reducer';


const rootReducer = combineReducers({
  currentUser: FireBaseUserReducer,
  feedback: FeedbackReducer,
  PGUser: PGUserReducer,
  notifications
});

export default rootReducer;
