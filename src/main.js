import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;
Vue.use(api);
new Vue({
  router,
  store,
  api,
  render: h => h(App),
}).$mount('#app');
