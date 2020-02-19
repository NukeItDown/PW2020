<template>
    <button v-on:click="next" id="btn">Make an order</button>
</template>
<script>
    export default{
      props:['count','text'],
      data(){
        return{
          active: 1
        }
      },
      methods:{
        next: function (){
          this.active++;
          this.$emit('Next', this.active);
        }
      }
    }
</script>
<style scoped>
button {
  margin-top: 20vh;
  outline: none;
  height: 5vh;
  weight: 10vh;
  font-size: 4vh;
  border-radius: 1vh;
  background: orange;
}
</style>
