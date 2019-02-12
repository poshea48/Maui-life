import { GET_HIKES, HIKES_LOADING, UPDATE_HIKES } from '../actions/types';

const initialState = {
  hikes: null,
  loading: false
}

export default(state = initialState, action) => {
  switch(action.type) {
    case HIKES_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_HIKES:
      return {
        ...state,
        hikes: action.payload,
        loading: false
      }
    case UPDATE_HIKES:
      let hikes = state.hikes
      hikes.push(action.payload)
      return {
        ...state,
        hikes: hikes,
        loading: false
      }

    default:
      return state
  }
}
