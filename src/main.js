// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// JS import
import Vue from 'vue'
import VueOnsen from '../node_modules/vue-onsenui'; // This imports 'onsenui', so no need to import it separately
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies'

axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false

Vue.use(VueOnsen);
Vue.use(VueCookies);

// VueOnsen.ready(function(){
//   setDefaultDeviceBackButtonListener(function() {window.history.length > 1 ? Vue.$router.go(-1) : Vue.$router.push('/')});
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
