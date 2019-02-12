import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_ERRORS } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/profile')
  .then(res => {
    return dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  }

  )
  .catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  )
}

export const getProfileByUserId = (id) => dispatch => {
  dispatch(setProfileLoading())
  axios.get(`/api/profile/user/${id}`)
  .then(res => {
    return dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  }
  )
  .catch(err => {
    return dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  }
  )
}

// Create/Update Profile
export const saveProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => {
      console.log("hello inside saveProfile")
      console.log(history)
      return history.push('/home')
    })
    .catch(err => {
      console.log(err)
      return dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })
}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

// delete account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure?  This cannot be undone")) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      ).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}
