<script>
import {mapGetters} from "vuex"
export default {
  computed: mapGetters(["showOrder","getTotalCost"])
}
</script>
<template>
  <div>
    <div id="order-box">
      <p>Your Order:</p>
      <div id="list">
        <div v-for="(elem, index) in showOrder" :key="index">
          <p class="order-elem">{{elem.name+' ('+elem.amount+') &minus; '+Math.round(elem.cost*elem.amount*100)/100}}&#36;</p>
          <hr class="line">
        </div>
      </div>
      <p id="total">Total:{{Math.round(getTotalCost*100)/100}}&#36;</p>
    </div>
  </div>
</template>
<style scoped>
#order-box{
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #ffd595;
  margin: 2vh;
  transition: box-shadow .3s;
}
#list{
  height: 30vh;
  width: 30vh;
  overflow: hidden;
}
.line{
  margin: 0.1vh;
  border: 0;
  height: 0.1vh;
  background: #333;
  background-image: -webkit-linear-gradient(left, #ccc, #333, #ccc);
}
#order-box p{
  font-size: 2.3vh;
}
#order-box:hover{
  box-shadow: 0 0 10px black;
}
#list:hover {
  overflow-y: scroll;
}
#total{
  border-top: 0.1vh dashed  #333;
}
</style>