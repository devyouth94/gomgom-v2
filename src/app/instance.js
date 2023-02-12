import axios from 'axios';
import { userStorage } from 'lib/utils/storage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    accessToken: `Bearer ${userStorage.getToken('access')}`,
    refreshToken: `Bearer ${userStorage.getToken('refresh')}`,
  },
});

instance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.accessToken = `Bearer ${userStorage.getToken('access')}`;
    config.headers.refreshToken = `Bearer ${userStorage.getToken('refresh')}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => {
    if (config.status === 201 && config.data.msg.includes('재발급')) {
      return axios({
        ...config.config,
        headers: {
          accessToken: `Bearer ${config.data.accessToken}`,
          refreshToken: `Bearer ${config.data.refreshToken}`,
        },
      }).then(() => {
        userStorage.setToken(config.data);
      });
    } else {
      return config;
    }
  },

  (error) => {
    if (error.response.status === 401 && error.response.data.errMsg.includes('만료')) {
      localStorage.clear();
    }
    return Promise.reject(error);
  },
);

export default instance;
