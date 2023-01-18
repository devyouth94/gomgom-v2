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
};

Object.freeze(userStorage);

export { userStorage };
