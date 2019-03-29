<template>
  <v-flex xs8 offset xs-2>
    <v-layout align-center justify-center>
      <v-flex xs6>
        <v-card class="ma-5">
          <v-img :src="currentProduct.image" class="ma-0"></v-img>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-layout align-center column class="ma-5">
          <v-flex class="pa-3">
            <h1>{{currentProduct.name}}</h1>
          </v-flex>
          <v-flex class="pa-3">
            <v-layout>
              <h1
                class="text-md-center"
              >Rp. {{((currentProduct.price * (100-currentProduct.promo))/100).toLocaleString()}}</h1>
            </v-layout>
            <v-layout mt-3>
              <p>Quantity</p>
            </v-layout>
            <v-layout align-start justify-start row>
              <v-flex xs1>
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
              </v-flex>
              <v-flex xs2>
                <v-badge>
                  <div>
                    <h1>{{orderQuantity}}</h1>
                  </div>
                </v-badge>
              </v-flex>
              <v-flex xs1>
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
              </v-flex>
            </v-layout>
            <v-layout mt-5>
              <div>
                <v-btn @click="addToCart">add to card</v-btn>
              </div>
            </v-layout>
            <v-layout align-start mt-5>
              <p class="text-lg-left">{{currentProduct.description}}</p>
            </v-layout>
          </v-flex>
        </v-layout>
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
    this.fetchShipping()
  },
  computed: {},
  methods: {
    fetchShipping() {
      this.$store.dispatch("fetchDeliveryCharge");
    },
    getProduct() {
      axios
        .get(`/products/${this.productId}`)
        .then(({ data }) => {

          this.currentProduct = data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    addQuantity() {
      this.orderQuantity += 1;
      this.$store.commit("addQuantity", this.orderQuantity);
    },
    reduceQuantity() {
      this.orderQuantity -= 1;
      if (this.orderQuantity < 0) {
        this.orderQuantity = 0;
      }
    },
    addToCart() {
      this.$store.dispatch("addToCart", {
        data: this.currentProduct,
        quantity: this.orderQuantity
      });
    }
  }
};
</script>

<style scoped>
#quantityButton {
  cursor: all-scroll;
}
</style>


