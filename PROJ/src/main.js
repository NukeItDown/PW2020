import Vue from 'vue'
import App from './App.vue'
import Model from './layouts/OrderModel.vue'
import store from './store/index.js'


Vue.config.productionTip = false

Vue.component('app-order', Model)
Vue.component('Edit',{
  data(){
    return{
      opened:false
    }
  },
  methods:{
    addAmount(value) {
      if (value.count < value.max) value.count++;
    },
    minusAmount(value) {
      if (value.count > 0) value.count--;
    }
  },
  template:
  `<div>
    <button class="edit" :id="1" @click.prevent="opened=!opened">Edit</button>
    <div v-show="opened" :class="'igredList editMenu-'+ 1">
      <div class="ingred" v-for="(elem) in ingList.igred" :key="ingList.name+elem.name">
        {{elem.name}}
        <div class="minus" @click.prevent="minusAmount(elem)">&minus;</div>
        {{elem.count}}
        <div class="plus" @click.prevent="addAmount(elem)">&plus;</div>
      </div>
    </div>
  </div>`,
  props:["ingList"]
})
new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
