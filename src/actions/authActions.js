import 'es6-promise/auto'; //import es6-promise for ie
import axios from 'axios';
import urlHelper from '../utils/urlHelper';
import { push } from 'react-router-redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export function login(username, password) {
  return dispatch => {
    axios({
      url: urlHelper.t('graphql'),
      method: 'post',
      data: {
        query: `
          query {
            user (username:"${ username }", password: "${ password }"){
              id,
              username,
              role,
              teams{
                id,
                name
              }
            } 
          }
        `
      }
    }).then(response => {
      const { data: { data: {user} } } = response;
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: LOGIN_SUCCESS, user });
      dispatch(push('/home'));
    }).catch(error => {
      if(error.response.status >= 400 && error.response.status !== 401) {
        dispatch({ type: LOGIN_FAILED, error });
      }
    });
  };
}

export const RELOAD_AUTH = 'RELOAD_AUTH';
// export function reloadAuth() {
//   return dispatch => {
//     console.log('reload');
//     const user = JSON.parse(localStorage.user);
//     dispatch({ type: LOGIN_SUCCESS, user });
//     // user ? dispatch({type: RELOAD_AUTH, user}) : dispatch(push('/login'));
//   };
// }
