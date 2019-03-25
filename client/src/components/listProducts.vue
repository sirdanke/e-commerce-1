<template>
  <v-flex xs10>
    <v-layout wrap>
      <v-flex class="article-card" v-for="product in collections" :key="product._id" xs3>
        <v-card class="article ma-3" elevation="5">
          <v-img class="zoom" height="200px" :src="product.image">
            <v-container fill-height fluid v-if="product.promo > 0">
              <v-layout fill-height>{{ product.promo}} % off</v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text"></span>
              <br>
              <span class="headline font-weight-thin mb-3">{{product.name}}</span>
              <div>
                <span
                  class="grey--text"
                  style="text-decoration-line: line-through;"
                  v-if="product.promo > 0"
                >Rp. {{ toLocaleString(Number(product.price))}}</span>
                <div class="headline">Rp. {{ toLocaleString((product.price * (100-product.promo))/100)}}</div>
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn v-if="!isAdmin" small color="transparent" class="ma-1" @click="$router.push(`/product/${product._id}`)">ADD TO CART</v-btn>
            <v-btn v-if="isAdmin" @click.prevent="$store.dispatch('deleteProduct', product._id)">delete</v-btn>
            <v-btn v-if="isAdmin" @click="$router.push(`/admin/edit/${product._id}`)">update</v-btn>
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
      return input.toLocaleString()
    },
    addToCart(payload) {
      this.$store.dispatch("addToCart", payload);
    },
    // deleteProduct(id) {
      
    // }

  }
};
</script>

