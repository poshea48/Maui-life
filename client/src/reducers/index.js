import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import todosReducer from './todosReducer';
import hikesReducer from './hikesReducer';
import postReducer from './postReducer';
// rootReducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  todos: todosReducer,
  hikes: hikesReducer,
  post: postReducer
})
