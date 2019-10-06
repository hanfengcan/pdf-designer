import Vue from 'vue';
import ncform from '@ncform/ncform';
import ncformStdComps from '@ncform/ncform-theme-elementui';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';

Vue.use(ncform, { extComponents: ncformStdComps });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
