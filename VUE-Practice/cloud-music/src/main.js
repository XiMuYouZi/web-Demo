import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import 'normalize.css/normalize.css'
import './plugins/element.js'
import global from './plugins/global.js'

Vue.config.productionTip = false
Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
