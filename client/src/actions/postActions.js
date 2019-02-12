import { GET_POSTS, GET_POST, POST_LOADING, ADD_POST, LIKE_POST, REMOVE_LIKE, ADD_COMMENT, DELETE_POST, GET_ERRORS } from './types'
import axios from 'axios'

export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios.get('/api/posts')
    .then(res => {
      return dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    }

    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: []
      })

    )
}

export const getPost = (post) => dispatch => {
  dispatch({
    type: GET_POST,
    payload: post
  })
}

export const addPost = (postData) => dispatch => {
  axios
    .post(`/api/posts`, postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}

export const likePost = (postId) => dispatch => {
  axios.post(`/api/posts/${postId}/like`)
    .then(res =>
      dispatch({
        type: LIKE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const removeLike = (postId) => dispatch => {
  axios.post(`/api/posts/${postId}/unlike`)
    .then(res =>
      dispatch({
        type: REMOVE_LIKE,
        payload: res.data
      })
    )
    .catch(err => console.log(err))
}

export const addComment = (postId, comment) => dispatch => {
  axios.post(`/api/posts/${postId}/comments`, comment)
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deletePost = (postId) => dispatch => {
  axios.delete(`/api/posts/${postId}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    )
    .catch(err => console.log(err))
}

const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}
