/* eslint-disable */
import 'es6-promise/auto'; //import es6-promise for ie
import axios from 'axios';
import urlHelper from '../utils/urlHelper';
import { push } from 'react-router-redux';

export const TEMP = 'TEMP';

export function temp() {
  return dispatch => {
    axios.get(urlHelper.t('temp'), {
    }).then(response => {
    }).catch(error => {
    });
  };
}