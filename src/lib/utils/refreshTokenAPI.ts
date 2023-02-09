import instance from 'app/instance';
import { TokenData, userStorage } from 'lib/utils/storage';

export const refreshTokenAPI = async () => {
  const { data } = await instance.get<TokenData>('/user/me');

  userStorage.setToken(data);
};
