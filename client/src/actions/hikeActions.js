import axios from 'axios';
import { HIKES_LOADING, GET_HIKES, UPDATE_HIKES, GET_ERRORS} from './types';

export const getHikes = () => dispatch => {
  dispatch(setHikesLoading())
  console.log("inside actions getHikes")
  axios.get('/api/hikes')
    .then(res => {
      console.log("inside axios api call")
      return dispatch({
        type: GET_HIKES,
        payload: res.data
      })
    }

    )
    .catch(err =>
      dispatch({
        type: GET_HIKES,
        payload: []
      })
    )
}

export const setHikesLoading = () => {
  return {
    type: HIKES_LOADING
  }
}

export const createHike = (hikeData) => dispatch => {
  axios
  .post('/api/hikes', hikeData)
  .then(res => {
    console.log(res)
    return dispatch({
      type: UPDATE_HIKES,
      payload: res.data,
    })
  }

  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

// export const clearHikes = () => {
//   return {
//     type: CLEAR_TODOS
//   }
// }
