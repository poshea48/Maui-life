import { GET_TODOS, TODOS_LOADING, UPDATE_TODOS, TOGGLE_COMPLETED, CLEAR_TODOS} from '../actions/types';

const initialState = {
  todos: null,
  todo: null,
  loading: false
}

export default(state = initialState, action) => {
  switch(action.type) {
    case TODOS_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false
      }
    case UPDATE_TODOS:
      let todos = state.todos
      todos.push(action.payload)
      return {
        ...state,
        todos: todos,
        loading: false
      }
    case TOGGLE_COMPLETED:
      todos = state.todos.map(todo => {
        return todo._id === action.payload._id ? action.payload : todo
      })

      return {
        ...state,
        todos: todos,
        loading: false
      }
    case CLEAR_TODOS:
      return {
        ...state,
        todos: null,
        loading: false
      }
    default:
      return state
  }
}
