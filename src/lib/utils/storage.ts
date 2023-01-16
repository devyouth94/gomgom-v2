const userStorage = {
  getToken: () => {
    return localStorage.getItem('accessToken');
  },
};

Object.freeze(userStorage);

export { userStorage };
