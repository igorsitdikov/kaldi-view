import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import vuetify from './plugins/vuetify';

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;
Vue.use(api);
new Vue({
  router,
  store,
  api,
  vuetify,
  render: h => h(App),
}).$mount('#app');
