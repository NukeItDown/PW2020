<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["products", "category", "foodIngred"],
  methods: {
    ...mapMutations(["addFood"]),
    addToOrder(value, category, foodIngred) {
      this.addFood({ foodData: value, type: category, ingred: foodIngred });
    },
    dropEditMenu: function(event) {
      if (event.target.classList.contains("dropped")) {
        event.target.classList.remove("dropped");
        document.querySelector(".editMenu-" + event.target.id).style.display =
          "none";
      } else {
        event.target.classList.add("dropped");
        document.querySelector(".editMenu-" + event.target.id).style.display =
          "block";
      }
    },
    addAmount(value) {
      if (value.count < value.max) value.count++;
    },
    minusAmount(value) {
      if (value.count > 0) value.count--;
    },
    setDefault(elem) {
      for (let el in elem) {
        elem[el].count = elem[el].default;
      }
    },
    buildMenu() {
      this.products.forEach(element => {
        element.igred = Object.assign({}, element.igred);
        for (let el in this.foodIngred) {
          element.igred[el] = Object.assign(
            {},
            element.igred[el],
            this.foodIngred[el]
          );
        }
      });
    }
  },
  beforeUpdate() {
    this.buildMenu();
  }
};
</script>

<template>
  <div id="panel">
    <div class="product-card" v-for="(value, index) in products" :key="value.name">
      <header>
        <img src="../assets/menu_pizza/pepperoni.jpg" />
        <h1>{{ value.name }}</h1>
        <h2>{{ value.cost }} &#36;</h2>
      </header>
      <div class="product-ingr">
        <p>{{ value.igrediens }}</p>
        <button class="cart" @click.prevent="addToOrder(value,category)">Add</button>
        <button class="edit" :id="index" @click.prevent="dropEditMenu">Edit</button>
        <div :class="'igredList editMenu-'+ index">
          <div class="ingred" v-for="(elem) in value.igred" :key="value.name+elem.name">
            {{elem.name}}
            <div class="minus" @click.prevent="minusAmount(elem)">&minus;</div>
            {{elem.count}}
            <div class="plus" @click.prevent="addAmount(elem)">&plus;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 100px;
  width: 100px;
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
  background: #fff;
  padding: 10px 30px;
  color: #ff5722;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
}
.igredList {
  display: none;
}
.dropped {
  border: 0.5vh solid red;
}
.ingred {
  text-align: right;
  transform: translateX(-20%);
  padding: 5px;
  display: block;
}
.plus,
.minus {
  display: inline-block;
  text-align: center;
  height: 15px;
  width: 15px;
  border-radius: 5px;
  cursor: pointer;
  background: #faac52;
}
.cart:hover {
  width: auto;
  background: rgb(255, 70, 14);
  color: #fff;
  padding: 10px 30px;
  cursor: pointer;
}
.edit:hover {
  width: auto;
  background: #ff8f0e;
  color: #fff;
  padding: 10px 30px;
  cursor: pointer;
}
.cart {
  background: #ff5722;
  color: #fff;
  padding: 10px 30px;
  cursor: pointer;
}
.edit {
  background: #f89828;
  color: #fff;
  padding: 10px 30px;
  cursor: pointer;
}

.product-card {
  display: inline-block;
  margin-bottom: 2vh;
  margin-left: 2vh;
  background: #ff5722;
  width: 550px;
  height: 156px;
  z-index: 2;
  overflow: hidden;
  opacity: 0;
  border-radius: 50%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
  animation: init 1.5s 0.2s cubic-bezier(0.55, 0.055, 0.275, 0.19) forwards,
    materia 0.5s 0.9s cubic-bezier(0.86, 0, 0.07, 1) forwards;
}
.product-card header {
  width: 230px;
  height: 280px;
  padding: 50px 0px 10px 0px;
  float: left;
  border-right: 2px dashed #eeeeee;
  background: #ffffff;
  color: #000000;
  margin-top: 50px;
  opacity: 0;
  text-align: center;
  animation: moveIn 1s 1s ease forwards;
}

.product-card header h1 {
  color: #ff5722;
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
  border: 4px solid #ffffff;
  transform: scale(0);
  background: linear-gradient(
    #ff5722 0%,
    #ff5722 50%,
    #ff5722 50%,
    #ff5722 100%
  );
  color: #fff;
  border-radius: 50%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  animation: scaleIn 1s 1s ease forwards;
}

.product-card .product-ingr {
  width: 165px;
  height: 180px;
  display: inline-block;
  padding: 50px 20px 30px 20px;
  background: #ffffff;
  color: #333333;
  margin-top: 50px;
  text-align: center;
  opacity: 0;
  animation: moveIn 0.6s 0.6s ease forwards;
}

@keyframes init {
  0% {
    width: 0px;
    height: 0px;
  }
  100% {
    width: 36px;
    margin-top: 0px;
    opacity: 1;
  }
}

@keyframes materia {
  0% {
    background: #e0e0e0;
  }
  50% {
    border-radius: 4px;
  }
  100% {
    width: 440px;
    min-height: 280px;
    height: auto;
    background: #ffffff;
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
      background: #e0e0e0;
    }
    50% {
      border-radius: 4px;
    }
    100% {
      width: 280px;
      height: 440px;
      background: #ffffff;
      border-radius: 4px;
    }
  }
}
</style>