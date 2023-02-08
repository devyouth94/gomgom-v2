interface UserData {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  userKey: number;
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
