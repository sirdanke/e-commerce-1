<template>
  <v-container class="container">
    <v-layout row fill-height class="mt-5">
      <sideNav/>
      <router-view/>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "@/api/axios.js";
import sideNav from "@/components/AdminSideNav";
import productForm from "@/components/ProductForm";
export default {
  name: "product-form",
  components: {
    sideNav,
    productForm
  },
  created() {
    this.setDefaultPage()
  },
  methods : {
    setDefaultPage() {
      this.$store.commit('setDefaultPage')
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 80%;
}
</style>



