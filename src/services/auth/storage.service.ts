const TOKEN_KEY = 'user_token';
const USER_LOGON = 'user_logon';

export const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken({token}: any) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_LOGON);
  },

  saveUserLogon(userLogon: any) {
    localStorage.setItem(USER_LOGON, userLogon);
  },

  getUserLogon() {
    return localStorage.getItem(USER_LOGON);
  },
};
