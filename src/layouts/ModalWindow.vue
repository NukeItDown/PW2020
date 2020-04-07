<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return{

    }
  },
  props:['show'],
  computed: mapGetters(["getTotalCost"]),
  methods:{
  }
}
</script>
<template>
  <div id="myModal" class="modal" v-if="show">

    <div class="modal-content" >
      <span class="close" v-on:click="$emit('CloseModalWindow', !show)">&times;</span>
      <p>Total:{{Math.round(getTotalCost*100)/100}}&#36;</p>
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
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

</style>