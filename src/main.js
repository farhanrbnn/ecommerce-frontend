// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import Notifications from 'vue-notification'
import AsyncComputed from 'vue-async-computed'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookie from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueCookie)
Vue.use(Notifications)
Vue.use(AsyncComputed)
Vue.use(BootstrapVueIcons)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
