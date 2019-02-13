import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { clearTodos } from './actions/todoActions'
import { Provider } from 'react-redux';
import store from './store';

import * as serviceWorker from './serviceWorker';

if (localStorage.jwtTokenMaui) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtTokenMaui);
  // Decode and get user info and exp
  const decoded = jwt_decode(localStorage.jwtTokenMaui);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    store.dispatch(clearTodos());
    // Redirect to login
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
