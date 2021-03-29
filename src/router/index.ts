import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { ApiService } from '../services/api.service';
import store from '../store';
import Login from '../views/Login.vue';
import Customers from '../views/Customers.vue';
import CustomerDetails from '../views/CustomerDetails.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { transitionName: 'slide', public: true },
  },

  {
    path: '/customers',
    name: 'customers',
    component: Customers,
    meta: { transitionName: 'slide', public: false },
  },

  {
    path: '/customers/details/:id',
    name: 'details',
    component: CustomerDetails,
    meta: { transitionName: 'slide', public: false },
  },

  {
    path: '/',
    redirect: {
      name: 'login',
    },
    meta: { transitionName: 'slide' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  if (!isPublic && !store.state.auth.accessToken) {
    return next('/login');
  }

  else if(to.name === 'login' && store.state.auth.accessToken){
    ApiService.setHeader();
    return next('/customers')
  }

  ApiService.setHeader();
  return next();
});

export default router;
