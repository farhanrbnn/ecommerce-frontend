// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import Notifications from 'vue-notification'
import AsyncComputed from 'vue-async-computed'
import VueCookie from 'vue-cookies'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(faEye)
library.add(faEyeSlash)


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueCookie)
Vue.use(Notifications)
Vue.use(BootstrapVueIcons)

Vue.component('font-awesome-icon', FontAwesomeIcon)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
