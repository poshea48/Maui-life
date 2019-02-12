import { CLEAR_ERRORS } from './types';

export const clearErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_ERRORS,
    payload: {}
  })
}
