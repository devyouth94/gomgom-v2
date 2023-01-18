import axios from 'axios';
import { userStorage } from 'lib/utils/storage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    accessToken: `Bearer ${userStorage.getToken('access')}`,
    refreshToken: `Bearer ${userStorage.getToken('refresh')}`,
  },
});

export default instance;
