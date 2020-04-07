<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return{
      saved: 0,
      promoCodeSale:1,
      totalCost: 0,
      code: ''
    }
  },
  props:['show'],
  computed:{
    price(){
      return Math.round(this.getTotalCost*100*this.promoCodeSale)/100
    }, 
    ...mapGetters(["getTotalCost"])
  },
  methods:{
    verifyCode(code){
      code.trim() == 'payless' ? this.promoCodeSale = 1 - 0.3: this.promoCodeSale = 1
    }
  },
  updated(){
    let cost = this.getTotalCost
    this.totalCost = Math.round(cost*100*this.promoCodeSale)/100
    this.saved = Math.round((cost-this.totalCost)*100)/100 
  }
}
</script>
<template>
  <div id="myModal" class="modal" v-if="show">

    <div class="modal-content" >
      <span class="close" v-on:click="$emit('CloseModalWindow', !show)">&times;</span>
      <div>Total:{{price}}&#36;</div>
      <div class="offCost" v-if="saved != 0">SAVED: {{saved}}&#36;</div>
      <input v-model="code" class="promoCode" type="text" placeholder="Promo code!"><button class="bth-submit" @click="verifyCode(code)">USE</button>
      <form>

      </form>
    </div>

  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  position: relative;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  position: absolute;
  top: 0px;
  right: 5px;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.offCost{
  background-color: rgba(231, 31, 31, 0.4);
  border: 0.1vh solid rgba(255, 0, 0, 0.671);
}

</style>
