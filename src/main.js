// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import axios from 'axios';

import qs from 'qs';

Vue.config.productionTip = false;

Vue.prototype.fetch = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$api = 'localhost:8080';
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data);
return config;
}, function(error) {
    return Promise.reject(error);
});
Vue.config.productionTip = false;
//axios.defaults.baseURL = 'http://testpay.icitic.net/bsp'

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
