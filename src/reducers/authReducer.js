import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  RELOAD_AUTH
} from '../actions/authActions';

const initialState = {
  user: null,
  error: null,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case RELOAD_AUTH:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};