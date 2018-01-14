import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage'; // eslint-disable-line import/no-named-as-default
import HomePage from './containers/HomePage'; // eslint-disable-line import/no-named-as-default

const checkLogin = (store) => {
  return (nextState, replace) => {
    const user = store.getState().authState.user;
    console.log(user)
    console.log(localStorage.user)
    if (user || localStorage.user) {
      console.log('in')
      // replace({
      //   pathname: '/home'
      // });
    }
  };
};

const requireAuth = (store) => {  
  return (nextState, replace) => {
    const user = store.getState().authState.user;
    if (!user && localStorage.user) {
      store.dispatch({ type: 'RELOAD_AUTH', user:JSON.parse(localStorage.user)});
    } else if (!user && !localStorage.user) {
      replace({
        pathname: '/login'
      });
    }
  };
};

export const routes = (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={LoginPage} onEnter={checkLogin(store)}/>
      <Route path="home" component={HomePage} onEnter={requireAuth(store)}/>
    </Route>
  );
};
