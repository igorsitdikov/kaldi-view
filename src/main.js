import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
