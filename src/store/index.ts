import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.module';

Vue.use(Vuex);

export default new Vuex.Store<any>({
  modules: {
    auth,
  },
  strict: false,
});
