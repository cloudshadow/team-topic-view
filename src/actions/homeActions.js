import 'es6-promise/auto'; //import es6-promise for ie
import axios from 'axios';
import urlHelper from '../utils/urlHelper';

export const GET_TEAM_POSTS_SUCCESS = 'GET_TEAM_POSTS_SUCCESS';
export const GET_TEAM_POSTS_FAILED = 'GET_TEAM_POSTS_FAILED';
export function getTeamPosts(teamId) {
  return dispatch => {
    axios({
      url: urlHelper.t('graphql'),
      method: 'post',
      data: {
        query: `
          query {
            team(id: ${teamId}){
              posts{
                id,
                author,
                title,
                desc,
                zindex,
                positionx,
                positiony,
                height,
                width,
                color,
                status,
                team_id
              }
            }
          }
        `
      }
    }).then(response => {
      const { data: { data: { team:{ posts } } }  } = response;
      dispatch({ type: GET_TEAM_POSTS_SUCCESS, posts });
    }).catch(error => {
      if(error.response.status >= 400 && error.response.status !== 401) {
        dispatch({ type: GET_TEAM_POSTS_FAILED, error });
      }
    });
  };
}

export const CREATE_TEAM_POST_SUCCESS = 'CREATE_TEAM_POST_SUCCESS';
export const CREATE_TEAM_POST_FAILED = 'CREATE_TEAM_POST_FAILED';
export function createTeamPost(post) {
  return dispatch => {
    axios({
      url: urlHelper.t('graphql'),
      method: 'post',
      data: {
        query: `
          mutation {
            createPost(
              author: "${post.author}",
              title:  "${post.title}",
              desc:  "${post.desc}",
              zindex: ${post.zindex},
              positionx: ${post.positionx},
              positiony: ${post.positiony},
              height: ${post.height},
              width: ${post.width},
              color:  "${post.color}",
              status: ${post.status},
              team_id: ${post.teamId}
            ){
              id,
              author,
              title,
              desc,
              zindex,
              positionx,
              positiony,
              height,
              width,
              color,
              status,
              team_id
            }
          }
        `
      }
    }).then(response => {
      const { data: { data: { createPost } }  } = response;
      const post = createPost;
      dispatch({ type: CREATE_TEAM_POST_SUCCESS, post });
    }).catch(error => {
      if(error.response.status >= 400 && error.response.status !== 401) {
        dispatch({ type: CREATE_TEAM_POST_FAILED, error });
      }
    });
  };
}

export const UPDATE_TEAM_POST_SUCCESS = 'UPDATE_TEAM_POST_SUCCESS';
export const UPDATE_TEAM_POST_FAILED = 'UPDATE_TEAM_POST_FAILED';
export function updateTeamPost(post, posts) {
  return dispatch => {
    axios({
      url: urlHelper.t('graphql'),
      method: 'post',
      data: {
        query: `
          mutation {
            updatePost(
              id: ${post.id},
              author: "${post.author}",
              title:  "${post.title}",
              desc:  "${post.desc}",
              zindex: ${post.zindex},
              positionx: ${post.positionx},
              positiony: ${post.positiony},
              height: ${post.height},
              width: ${post.width},
              color:  "${post.color}",
              status: ${post.status}
            ){
              id,
              author,
              title,
              desc,
              positionx,
              positiony,
              height,
              width,
              color,
              status,
              team_id
            }
          }
        `
      }
    }).then(response => {
      const { data: { data: { updatePost } }  } = response;
      posts[posts.findIndex(post => post.id === updatePost.id)] = updatePost;
      dispatch({ type: UPDATE_TEAM_POST_SUCCESS, posts });
    }).catch(error => {
      if(error.response.status >= 400 && error.response.status !== 401) {
        dispatch({ type: UPDATE_TEAM_POST_FAILED, error });
      }
    });
  };
}

export const LIVE_UPDATED_TEAM_POST_SUCCESS = 'UPDATE_TEAM_POST_SUCCESS';
export function liveUpdatedTeamPost(updatedPost, posts) {
  return dispatch => {
    posts[posts.findIndex(post => post.id === updatedPost.id)] = updatedPost;
    dispatch({ type: LIVE_UPDATED_TEAM_POST_SUCCESS, posts });
  };
}