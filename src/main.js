import Vue from 'vue'
import router from './router'
import store from './store/index'
import App from './App.vue'
import Notifications from 'vue-notification'

import '@/assets/css/_themed.scss'
import '@/assets/css/_style.scss' // Main style definitions
import '@/assets/css/_header.scss' // Main header style
import '@/assets/css/_sidebar.scss' // Sidebar style - Navigation side style
import '@/assets/css/_content.scss' // Content area definitions

import validate from 'vee-validate'
Vue.use(validate, Notifications);


Vue.config.productionTip = false;

// Application
var vm = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

window.vm = vm;
