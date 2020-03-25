// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// JS import
import Vue from 'vue'
import VueOnsen from '../node_modules/vue-onsenui'; // This imports 'onsenui', so no need to import it separately
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueOnsen);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
