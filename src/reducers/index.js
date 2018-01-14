import { combineReducers } from 'redux';
import authState from './authReducer';
import homeState from './homeReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  authState,
  homeState,
  routing: routerReducer
});

export default rootReducer;
