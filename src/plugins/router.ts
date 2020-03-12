import Vue from 'vue';
import Router from 'vue-router';
import ServiceDetail from '@/views/service-detail/template.vue';
import Home from '@/views/home/template.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,  
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:namespace/:service/:doctype',
      name: 'service-detail',
      component: ServiceDetail,
    },
    {
      path: '*',
      name: '404',
      redirect: '/',
    },
  ],
});
