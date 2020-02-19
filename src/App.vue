<template>
  <div id="app">
    <header id="hd">
      <div id="circle"><img alt="Pizza logo" src="./assets/pizza_logo.png"></div>
    </header>
    <div v-if="active == 1">
      <div class="process-wrap active-step1">
        <Steps :steps_n="steps_n" :active="active" />
      </div>
      <Order :count="active" @Next="active = $event"/>
    </div>
    <div v-else-if="active == 2">
      <div class="process-wrap active-step1">
        <Steps :steps_n="steps_n" :active="active" />
      </div>
      <div id="pizza">
        <Panel />
      </div>
      <Order :count="active" @Next="active = $event"/>
    </div>
    <div v-else-if="active == 3">
      <div class="process-wrap active-step1">
        <Steps :steps_n="steps_n" :active="active" />
      </div>
      <div id="pizza">
        Drinks!
      </div>
      <Order :count="active" @Next="active = $event"/>
    </div>
    <div v-else-if="active == 4">
      <div class="process-wrap active-step1">
        <Steps :steps_n="steps_n" :active="active" />
      </div>
      <div id="pizza">
        Burgers!
      </div>
      <Order :count="active" @Next="active = $event"/>
    </div>
    <div v-else>
      ALL DONE.
    </div>
  </div>
</template>

<script>
import Steps from './layouts/Steps.vue'
import Order from './layouts/getStarted.vue'
import Panel from './layouts/Panel.vue'

export default {
  name: 'App',
  data(){
    return {
      steps_n: ['Order', 'Pizza', 'Drinks', 'Burgers'],
      active: 1
    }
  },
  components: {
    Steps,
    Order,
    Panel
  }
}

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#circle{
  margin-top:0;
  margin: 0 auto;
  height: 100%;
  border-radius:50%;
  background: white;
  display: inline-block;
}
#hd{
  height:30vh;
  background: url("./assets/pizza_bg.jpg");
  background-position: center;
  background-size: cover;
  background-attachment: scroll;
  border-radius:1vh;
}
img{
  height:30vh;
  
  margin:0;
  padding:0;
}

</style>
<style>
*{
  margin:0;
  padding:0;
}
html{
  min-height:300px;
  min-width:100px;
}
.process-wrap {
  width: 50%;
  margin: 5vh auto;
}
</style>
