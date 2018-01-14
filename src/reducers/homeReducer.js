import {
  GET_TEAM_POSTS_SUCCESS,
  GET_TEAM_POSTS_FAILED,
  CREATE_TEAM_POST_SUCCESS,
  CREATE_TEAM_POST_FAILED,
  UPDATE_TEAM_POST_SUCCESS,
  UPDATE_TEAM_POST_FAILED
} from '../actions/homeActions';
import objectAssign from 'object-assign';

const initialState = {
  posts: [],
  error: null,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts
      };
    case GET_TEAM_POSTS_FAILED:
      return {
        ...state,
        error: action.error
      };
    case CREATE_TEAM_POST_SUCCESS:
      return objectAssign({},state,{posts:objectAssign([],state.posts).concat(action.post)});
    case CREATE_TEAM_POST_FAILED:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_TEAM_POST_SUCCESS:
      return {
        ...state,
        posts: action.posts
      };
    case UPDATE_TEAM_POST_FAILED:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};