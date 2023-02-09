interface UserData extends TokenData {
  nickname: string;
  userKey: number;
}

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

const userStorage = {
  setStorage: (userData: UserData) => {
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    localStorage.setItem('nickname', userData.nickname);
    localStorage.setItem('userKey', String(userData.userKey));
  },

  getToken: (type: 'access' | 'refresh') => {
    return localStorage.getItem(`${type}Token`);
  },

  setToken: (data: TokenData) => {
    localStorage.setItem(`accessToken`, data.accessToken);
    localStorage.setItem(`refreshToken`, data.refreshToken);
  },

  getUserKey: () => {
    return Number(localStorage.getItem('userKey'));
  },

  getNickname: () => {
    return localStorage.getItem('nickname') || '';
  },

  setNickname: (nickname: string) => {
    localStorage.setItem('nickname', nickname);
  },

  clearStorage: () => {
    localStorage.clear();
  },
};

Object.freeze(userStorage);

export { userStorage };
