import axios from 'axios';
import logger from './logger';
import { getState } from '../store';

const API_KEY = 'AIzaSyD15XONBwSn_kgvyJ7OE46Zt_CZ7_Yl6nM';
const BASE_URL = 'https://practce-on-focus.firebaseio.com';

// pun intended
class FireBaseService {
  constructor(baseUrl) {
    this.client = axios.create({
      baseURL: baseUrl || BASE_URL
    });
    logger.addInterceptor(this.client);

    this.client.interceptors.request.use(this._addApiKey, null);
  }

  getUserId() {
    const state = getState();
    if (!state.auth.user) {
      return Promise.reject();
    }
    return Promise.resolve(state.auth.user.localId);
  }

  _addApiKey(config) {
    config.params = {
      key: API_KEY
    };
    return config;
  }
}

export default FireBaseService;
