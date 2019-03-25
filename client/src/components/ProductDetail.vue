<template>
  <v-flex xs8 offset xs-1>
    <v-layout>
      <v-flex xs4>
        <v-img :src="currentProduct.image"></v-img>
      </v-flex>
      <v-flex>
        <h1>{{currentProduct.name}}</h1>
        <p>{{currentProduct.description}}</p>
        <p>Rp. {{(currentProduct.price * (100-currentProduct.promo))/100}}</p>

        <div class="text-xs-center">
          <v-badge left @click="addQuantity">
            <template v-slot:badge>
              <!-- <span>6</span> -->
            </template>
            <div id="quantityButton" @click="reduceQuantity">
              <h1>
                <i class="far fa-minus-square"></i>
              </h1>
              <!-- <v-icon large color="grey lighten-1">shopping_cart</v-icon> -->
            </div>
          </v-badge>
          <v-badge>
            <div>
              <h1>{{orderQuantity}}</h1>
            </div>
          </v-badge>

          <v-badge color="red">
            <template v-slot:badge>
              <!-- <span>!</span> -->
            </template>
            <div id="quantityButton" @click="addQuantity">
              <h1 class="quantityButton">
                <i class="far fa-plus-square"></i>
              </h1>
            </div>
            <!-- <v-icon large color="grey">mail</v-icon> -->
          </v-badge>
        </div>

        <div>
          <v-btn @click="addToCart">add to card</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import axios from "@/api/axios.js";
export default {
  data() {
    return {
      orderQuantity: 0,
      productId: this.$route.params.id,
      currentProduct: {}
    };
  },
  created() {
    this.getProduct();
  },
  computed : {
      
  },
  methods: {
    getProduct() {
      axios
        .get(`/products/${this.productId}`)
        .then(({ data }) => {
          console.log(data);

          this.currentProduct = data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    addQuantity(){
        this.orderQuantity += 1
    },
    reduceQuantity() {
        this.orderQuantity -= 1
        if(this.orderQuantity < 0) {
            this.orderQuantity = 0
        }
    },
    addToCart() {
   
        this.$store.dispatch('addToCart', {data : this.currentProduct, quantity : this.orderQuantity})
     
    
      
    }
  }
};
</script>

<style scoped>
#quantityButton {
  cursor: all-scroll;
}
</style>


