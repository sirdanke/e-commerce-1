<template>
  <v-container class="container">
    <v-layout row fill-height class="mt-5">
      <v-flex sm2>
        <v-list class="elevation-5" v-for="brand in listBrand">
          <v-list-tile class="sidenav-button">
            <v-list-tile-action>
              <p>{{brand}}</p>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <router-view/>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "@/api/axios.js";
import sideNav from "@/components/AdminSideNav";
import productForm from "@/components/ProductForm";
import { mapState } from "vuex";
export default {
  name: "product-form",
  components: {
    sideNav
  },
  computed: {
    listBrand() {
      let list = this.allProducts.map(a => a.brand);
      return list;
    },
    ...mapState(["allProducts"])
  }
};
</script>

<style scoped>
.container {
  max-width: 80%;
}
</style>



