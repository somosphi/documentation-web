import Vue from 'vue';
import 'swagger-ui/dist/swagger-ui.css';
import '@/registerServiceWorker';
import App from '@/components/app/template.vue';
import router from '@/plugins/router';
import { store } from '@/plugins/store/index';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
