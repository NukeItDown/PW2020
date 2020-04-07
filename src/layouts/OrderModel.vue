<script>
import {mapGetters} from "vuex"
import { mapMutations } from "vuex"
export default {
  data(){
    return{
      rows: 0
    }
  },
   methods:{
    ...mapMutations(['addAmountToOrd','minusAmountToOrd','removeFood','countUp','countDown']),
    addAmount(elem){
      this.addAmountToOrd({ref: elem})
    },
    minusAmount(elem){
      this.minusAmountToOrd({ref: elem})
    },
    remove(elem){
      this.removeFood({ref: elem})
    },
    minusCount(elem){
      this.countDown({ref: elem})
    },
    addCount(elem){
      this.countUp({ref: elem})
    }
  },
  computed: mapGetters(["showOrder"])
}
</script>
<template >
    <div>
      <table id="table" v-if="Object.entries(showOrder).length !== 0">
        <thead>
          <tr>
            <th><span>Food</span></th>
            <th><span>Amount</span></th>
            <th><span>Details</span></th>
            <th><span>Cost</span></th>
          </tr>
        </thead>
        <tbody v-for="(elem, index) in showOrder" :key="index" class="row">
          <tr>
            <td class="cell">{{elem.name}}</td>
            <td class="cell">
              <div class="oper" @click.prevent="minusAmount(elem)">&minus; </div>
              <p>{{elem.amount}}</p>
              <div class="oper" @click.prevent="addAmount(elem)"> &plus;</div>
              <div class="remove"  @click="remove(elem)">&cross;</div>
            </td>
            <td class="cell">
              <div class="igred" v-for="(el,index) in elem.igred" :key="index">
                <p>{{el.name }}</p>
                <div class="oper" @click.prevent="minusCount(el)">&minus; </div> 
                <p>{{el.count}}</p>
                <div class="oper" @click.prevent="addCount(el)"> &plus;</div>
              </div>
            </td>
            <td class="cell">{{Math.round(elem.cost*elem.amount*100)/100}}&#36;</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
<style scoped>
*{
  font-size: 5vh
}
#table{
  margin: 0 0 5vh 0;
  width: 100%;
  box-shadow: 0 1vh 2vh rgba(0,0,0,0.2);
}
#table thead th{
  background:#faac52;
}
#table thead th span{
  color:#f6f6f6;
}
.row{
  background: #fffdfd;
}
tbody .oper{
  display: inline-block;
  text-align: center;
  padding: 0 0 0.4vh 0;
  height: 5vh;
  width: 5vh;
  border-radius: 1vh;
  cursor: pointer; 
  background: #faac52;
}
tbody div{
  display: inline-block;
  text-align: center;
  padding: 0 0 0.4vh 0;
  height: 5vh;
  width: 5vh;
  border-radius: 1vh;
}
tbody p {
  display: inline-block;
  margin-left: 1.5vh;
  margin-right: 1.5vh;
}
tbody .oper:hover{
  background: #fa903a;
}
tbody tr td{
  min-width: 5vh;
}
.remove{
  font-size: 4vh;
  border-radius: 5vh;
  background-color: rgba(230, 63, 51, 0.959);
  color: #e9e9e9;
  float:right;
}
.remove:hover{
  background-color: rgb(255, 30, 0);
}
.row:nth-of-type(odd){
    background: #e9e9e9;
}
.cell{
  padding: 1vh 2vh;
}
.igred{
  display: block;
  width: auto;
  height: auto;
}
</style>