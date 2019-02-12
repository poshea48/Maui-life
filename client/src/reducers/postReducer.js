import { GET_POSTS, GET_POST, ADD_POST, LIKE_POST, REMOVE_LIKE, ADD_COMMENT, DELETE_POST, POST_LOADING } from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
}

const updatePosts = (newPost, posts) => {
  return posts.map(post => {
    if (post._id === newPost._id) {
      return {
        ...post,
        ...newPost
      }
    } else {
      return post
    }
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case LIKE_POST:
      return {
        ...state,
        posts: updatePosts(action.payload, state.posts)
      }
      case REMOVE_LIKE:
        return {
          ...state,
          posts: updatePosts(action.payload, state.posts)
        }
    case ADD_COMMENT:
      return {
        ...state,
        posts: updatePosts(action.payload, state.posts)
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    default:
      return state
  }
}
