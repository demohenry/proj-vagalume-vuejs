import { AuthenticationError, UserService } from '@/services/user/user.service';
import Vue from 'vue';
import Vuex from 'vuex';
import router from '../../router/index';
import { ApiService } from '../../services/api.service';
import { TokenService } from '../../services/auth/storage.service';

Vue.use(Vuex);

const state = {
  authenticating: false,
  accessToken: TokenService.getToken(),
  loggedIn: TokenService.getToken() ? true : false,
  authenticationErrorCode: 0,
  authenticationError: '',
};

const getters = {
  loggedIn: (state: any) => {
    return state.accessToken ? true : false;
  },

  authenticationErrorCode: (state: any) => {
    return state.authenticationErrorCode;
  },

  authenticationError: (state: any) => {
    return state.authenticationError;
  },

  authenticating: (state: any) => {
    return state.authenticating;
  },
};

const actions = {
  async login({ commit }: any, { email, password }: any) {
    commit('loginRequest');

    try {
      const token = await UserService.login(email, password);
      commit('loginSuccess', token);
      state.accessToken = token;
      TokenService.saveToken(token);
      ApiService.setHeader();
      return true;
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit('loginError', {
          errorCode: e.errorCode,
          errorMessage: e.message,
        });
      }
      throw e;
    }
  },

  logout({ commit }: any) {
    UserService.logout();
    commit('logoutSuccess');
    router.push('/');
  },
};

const mutations = {
  loginRequest(state: any) {


    state.authenticating = true;
    state.authenticationError = '';
    state.authenticationErrorCode = 0;
  },

  loginSuccess(state: any, accessToken: string) {


    state.accessToken = accessToken;
    state.authenticating = false;
  },

  loginError(state: any, { errorCode, errorMessage }: any) {

    
    state.authenticating = false;
    state.authenticationErrorCode = errorCode;
    state.authenticationError = errorMessage;
  },

  logoutSuccess(state: any) {
    state.accessToken = null;
  },
};

const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default auth;
