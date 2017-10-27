import Vue from 'vue'
import App from './App'
import router from './router'
import api from './services/api'

Vue.config.productionTip = false

export const $user = {
  isLogged: false,
  login: ''
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.use(bodyParser.json()) // handle json data
Vue.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
