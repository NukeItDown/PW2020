<script>
    import Panel from './Panel.vue'
    import axios from 'axios'
    import orderWindow from './OrderWindow'
    import ModalWindow from './ModalWindow'

    export default{
      components: {
        Panel,
        orderWindow,
        ModalWindow
      },
      props:['steps_n'],
      data(){
        return{
          message: 'Make an order',
          category: 0,
          prepareOrder: false,
          loadedData: {},
          loadedIngred: {},
          availableTemplates: ['pizza', 'drinks', 'burger'],
          products:[],
          extraIng:[]
        }
      },
      methods:{
        async loadData(num){
          try {
            this.category = num
            if(num == 0){
              return
            }
            if(Object.keys(this.loadedData).length === 0 && this.loadedData.constructor === Object){
              this.loadedData = await axios.get(`http://localhost:3000/menu`)
              this.loadedIngred = await axios.get(`http://localhost:3000/type`)
            }
            this.extraIng.splice(0,this.extraIng.length)
            this.extraIng.push(...this.loadedIngred.data[this.availableTemplates[num - 1]])
            this.products.splice(0,this.products.length)
            this.products.push(...this.loadedData.data[this.availableTemplates[num - 1]])
          } catch(e) {
            console.error(e)
          }
        },
        SwitchPrepareState(){
          this.prepareOrder = !this.prepareOrder;
        }
      },
      beforeUpdate(){
      }
    }
    
</script>

<template>
<div>
  <div class="process-wrap active-step1">
    <div class="process-main">
        <div class="col-3 " v-for="(steps, index) in steps_n" :key="index">
            <div class="process-step-cont"  >
                <div :class="['process-step step-' + index, category === index ? 'active' : '']" @click="loadData(index)"></div>
                <span :class="['process-label' , category === index ? 'lightUp' : '']"> {{ steps }} </span>
            </div>
        </div>
    </div>
  </div>
  <Panel v-if="category != 0" :products="products" :category="availableTemplates[category-1]" :foodIngred="extraIng" />
  <app-order v-if="category == 0"></app-order>
  <button v-if="category == 0" id="btn" @click="SwitchPrepareState">{{message}}</button>
  <orderWindow v-if="category != 0"/>
  <ModalWindow v-on:CloseModalWindow="SwitchPrepareState" :show="prepareOrder"/>
</div>
</template>

<style scoped>
.process-main {
    width: 100%;
    display: flex;
}
.col-3 {
  width: 25%;
  position: relative;
}
.process-main .col-3:not(:first-child):before{
    content: "";
    display: block;
    position: absolute;
    width: calc(90% + 3vh);
    height: 4%;
    top: 4vh;
    left: calc(-50% + 1vh);
    right: 0;
    background: #ebebeb;
    border: 0.5vh #ebebeb solid;
   -o-transition: .4s;
    -ms-transition: .4s;
    -moz-transition: .4s;
    -webkit-transition: .4s;
     transition: .4s;
}
.process-step-cont {
    font-family: sans-serif;
    font-size: 3vh;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: space-between;
}
.process-step {
    cursor: pointer;
    border: 1vh #ebebeb solid;
    border-radius: 100%;
    line-height: 0;
    background: #959595;
    text-align: center;
    align-items: center;
    justify-content: center;
    align-self: center;
    display: flex;
    color: #fff;
    width: 7vh;
    height: 7vh;
    font-weight: 700;
    margin-bottom: 0.2vh;
    z-index: 1;
}
.process-label {
    color: #959595;
    font-weight: 600;
     width: 100%;
     text-align: center;
}
.active{
  background-color: #f89828;
}
.lightUp{
  color: #f89828;
}
button {
  margin-bottom: 10vh;
  outline: none;
  height: 5vh;
  width: auto;
  font-size: 4vh;
  border-radius: 1vh;
  background: orange;
}
@media screen and (max-width: 260px) {
  .process-main {
    flex-wrap: wrap;
  }
  .col-3 {
    width: 50%;
  }
  .process-main .col-3:nth-of-type(2n+3):not(:first-child):before {
    width: 100%;
    top: -1.8vh;
    left: 50%;
    transform: rotate(170deg);
  }
}
@media screen and (max-width: 110px) {
  .process-main .col-3:nth-of-type(2n+3):not(:first-child):before {
    transform: rotate(150deg);
  }
}
</style>
