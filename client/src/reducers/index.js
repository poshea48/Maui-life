import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// rootReducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
})
