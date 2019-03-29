<template>
  <v-flex xs10>
    <v-layout wrap>
      <v-flex class="article-card" v-for="product in collections" :key="product._id" xs3>
        <v-card class="article ma-3" elevation="5" style="min-height:550px">
          <v-img class="zoom" height="300px" :src="product.image">
            <v-container fill-height fluid v-if="product.promo > 0">
              <v-layout fill-height><p>{{ product.promo}} % off</p></v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <v-layout column>
              <v-flex>
                <span class="grey--text"></span>
                <br>
                <span class="headline font-weight-thin mb-3">{{product.name}}</span>
              </v-flex>
              <v-flex>
                <p
                  class="grey--text-sm-left"
                  style="text-decoration-line: line-through;"
                  v-if="product.promo > 0"
                >Rp. {{ toLocaleString(Number(product.price))}}</p>
              </v-flex>
              <v-flex>
                <div class="headline"><h4>Rp. {{((product.price * (100-product.promo))/100).toLocaleString()}}</h4>
                </div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-actions>
            <v-layout align center>
              <v-flex>
              <v-btn
                v-if="isAdmin"
                @click.prevent="$store.dispatch('deleteProduct', product._id)"
              >delete</v-btn>
              </v-flex>
              <v-flex>
              <v-btn
                v-if="!isAdmin"
                small
                color="transparent"
                class="ma-1"
                @click="$router.push(`/product/${product._id}`)"
              >ADD TO CART</v-btn>
              </v-flex>
              <v-flex>
              <v-btn v-if="isAdmin" @click="$router.push(`/admin/edit/${product._id}`)">update</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    collections() {
      if (this.collectionPage === "default") {
        return this.allProducts;
      } else if (this.collectionPage === "Pants") {
        return this.allProducts.filter(a => {
          return a.category === "Pants";
        });
      } else if (this.collectionPage === "Clothes") {
        return this.allProducts.filter(a => {
          return a.category === "Clothes";
        });
      } else if (this.collectionPage === "Shoes") {
        return this.allProducts.filter(a => {
          return a.category === "Shoes";
        });
      }
    },
    ...mapState(["allProducts", "collectionPage", "isAdmin"])
  },
  methods: {
    toLocaleString(input) {
      return input.toLocaleString();
    },
    addToCart(payload) {
      this.$store.dispatch("addToCart", payload);
    }
    // deleteProduct(id) {

    // }
  }
};
</script>

