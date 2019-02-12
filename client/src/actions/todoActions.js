import axios from 'axios';
import { TODOS_LOADING, GET_TODOS, UPDATE_TODOS, TOGGLE_COMPLETED, CLEAR_TODOS, GET_ERRORS} from './types';

export const getTodos = () => dispatch => {
  dispatch(setTodosLoading())
  console.log("inside actions getTodos")
  axios.get('/api/todos')
    .then(res => {
      console.log("inside axios api call")
      return dispatch({
        type: GET_TODOS,
        payload: res.data
      })
    }

    )
    .catch(err =>
      dispatch({
        type: GET_TODOS,
        payload: []
      })
    )
}

export const setTodosLoading = () => {
  return {
    type: TODOS_LOADING
  }
}

export const createTodo = (todoData, history) => dispatch => {
  axios
  .post('/api/todos', todoData)
  .then(res =>
    dispatch({
      type: UPDATE_TODOS,
      payload: res.data,
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

export const toggleCompleted = (todoId) => dispatch => {
  axios
    .post(`/api/todos/${todoId}/toggleCompleted`)
    .then(res =>
      dispatch({
        type: TOGGLE_COMPLETED,
        payload: res.data
      })
    )
}

export const clearTodos = () => {
  return {
    type: CLEAR_TODOS
  }
}
