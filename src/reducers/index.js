import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import FireBaseUserReducer from './firebase_user_reducer';
import PGUserReducer from './pguser_reducer';
import FeedbackReducer from './feedback_reducer';
import TrainingReducer from './training_reducer';

const rootReducer = combineReducers({
  currentUser: FireBaseUserReducer,
  PGUser: PGUserReducer,
  feedback: FeedbackReducer,
  training: TrainingReducer,
  notifications
});

export default rootReducer;
