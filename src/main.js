import Vue from 'vue'
import App from './App.vue'
import Model from './layouts/OrderModel.vue'
import store from './store/index.js'


Vue.config.productionTip = false

Vue.component('app-order', Model)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
