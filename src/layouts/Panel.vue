<template>
    <div id="panel">
        <div class="product-card" v-for="(value, index) in 10" :key="index">
            <header>
                <img src="../assets/menu_pizza/pepperoni.jpg">
                <h1>Pepperoni {{value}}</h1>
                <h2>13.99$</h2>
            </header>
            <div class="product-ingr">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis ligula vitae lorem tempus maximus.</p>
                <button class="cart">Add</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['menu']
    }
</script>
<style scoped>
#panel{
    display:inline-block;
}
img{
    height:100px;
    weight:100px;
}
h1,
h2 {
  font-weight: 500;
  margin: 0px 0px 5px 0px;
}

h1 {
  font-size: 24px;
}

h2 {
  font-size: 16px;
}

p {
  margin: 0px;
}

button {
  margin-top: 20px;
  width: auto;
  border: 1px solid #FF5722;
  background: #fff;
  padding: 10px 30px;
  color: #FF5722;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
}
button:hover {
  width: auto;
  background: #FF5722;
  color: #fff;
  padding: 10px 30px;
  cursor: pointer;
}
.cart {
  background: #FF5722;
  color: #fff;
  padding: 10px 30px;
  cursor: pointer;
}

.product-card {
  display:inline-block;
  margin-bottom: 2vh;
  margin-left: 2vh;
  background: #FF5722;
  width: 550px;
  height: 156px;
  z-index: 2;
  overflow: hidden;
  opacity: 0;
  border-radius: 50%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
  animation: init 1.5s 0.2s cubic-bezier(0.55, 0.055, 0.275, 0.19) forwards, materia 0.5s .9s cubic-bezier(0.86, 0, 0.07, 1) forwards; 
}
.product-card header {
  width: 230px;
  height: 280px;
  padding: 50px 0px 10px 0px;
  float: left;
  border-right: 2px dashed #EEEEEE;
  background: #FFFFFF;
  color: #000000;
  margin-top: 50px;
  opacity: 0;
  text-align: center;
  animation: moveIn 1s 1.5s ease forwards;
}

.product-card header h1 {
  color: #FF5722;
}

.product-card header a {
  display: inline-block;
  text-align: center;
  position: relative;
  margin: 10px 20px;
}

.product-card header a > img {
  max-width: 100%;
}

.product-card header a:after {
  position: absolute;
  content: "$500";
  bottom: 3px;
  right: 3px;
  padding: 10px 5px;
  border: 4px solid #FFFFFF;
  transform: scale(0);
  background: linear-gradient(#FF5722 0%, #FF5722 50%, #FF5722 50%, #FF5722 100%);
  color: #fff;
  border-radius: 50%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  animation: scaleIn 1.3s 1.5s ease forwards;
}

.product-card .product-ingr {
  width: 165px;
  height: 180px;
  display: inline-block;
  float: right;
  padding: 50px 20px 30px 20px;
  background: #FFFFFF;
  color: #333333;
  margin-top: 50px;
  text-align: center;
  opacity: 0;
  animation: moveIn 1s 1s ease forwards;
}

@keyframes init {
  0% {
    width: 0px;
    height: 0px;
  }
  100% {
    width: 36px;
    height: 36px;
    margin-top: 0px;
    opacity: 1;
  }
}

@keyframes materia {
  0% {
    background: #E0E0E0;
  }
  50% {
    border-radius: 4px;
  }
  100% {
    width: 440px;
    height: 280px;
    background: #FFFFFF;
    border-radius: 4px;
  }
}

@keyframes moveIn {
  0% {
    margin-top: 50px;
    opacity: 0;
  }
  100% {
    opacity: 1;
    margin-top: -20px;
  }
}

@media screen and (min-aspect-ratio: 4/3) {
  body {
    background-size: cover;
  }
  body:before {
    width: 0px;
  }
  @-webkit-keyframes puff {
    0% {
      top: 100%;
      width: 0px;
      padding-bottom: 0px;
    }
    100% {
      top: 50%;
      width: 100%;
      padding-bottom: 100%;
    }
  }
  @keyframes puff {
    0% {
      top: 100%;
      width: 0px;
      padding-bottom: 0px;
    }
    100% {
      top: 50%;
      width: 100%;
      padding-bottom: 100%;
    }
  }
}

@media screen and (min-height: 480px) {
  .product-card header {
    width: auto;
    height: auto;
    padding: 20px 35px;
    display: block;
    float: none;
    border-right: none;
  }
  
  .product-card .product-ingr {
    width: auto;
    height: auto;
    padding: 10px 20px 30px 20px;
    display: block;
    float: none;
  }

  @keyframes materia {
    0% {
      background: #E0E0E0;
    }
    50% {
      border-radius: 4px;
    }
    100% {
      width: 280px;
      height: 440px;
      background: #FFFFFF;
      border-radius: 4px;
    }
  }
}
</style>