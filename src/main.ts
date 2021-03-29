import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import { ApiService } from './services/api.service';
import EventBus from './plugins/event.bus';

Vue.prototype.$bus = EventBus;
Vue.config.productionTip = false;

Vue.use(ElementUI);

ApiService.init('https://api.elcoma.com.br/api/visits');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
