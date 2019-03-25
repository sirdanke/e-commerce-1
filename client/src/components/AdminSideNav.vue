<template>
  <v-flex sm2>
    <v-list class="elevation-5">
      <v-list-tile class="sidenav-button" @click="$router.push('/admin')">
        <v-list-tile-content>
          <v-list-tile-title>Products</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <i class="material-icons">edit</i>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile class="sidenav-button" @click="create">
        <v-list-tile-content>
          <v-list-tile-title>Create</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <i class="material-icons">create</i>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile class="sidenav-button" @click="$router.push('/admin/transaction')">
        <v-list-tile-content>
          <v-list-tile-title>Transaction</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <i class="material-icons">edit</i>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-flex>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "side-nave-admin",
  data() {
    return {};
  },
  methods : {
    create() {
      this.$router.push('/admin/create')
    }
  },
  computed: {
    // listNavs() {
    //   if(this.isAdmin) {
    //     return ['create', 'transaction']
    //   }
    //   return this.collections.map(a => { a.brand})

    // },
    // collections() {
    //   if (this.collectionPage === "default") {
    //     return this.allProducts;
    //   } else if (this.collectionPage === "Pants") {
    //     return this.allProducts.filter(a => {
    //       return a.category === "Pants";
    //     });
    //   } else if (this.collectionPage === "Clothes") {
    //     return this.allProducts.filter(a => {
    //       return a.category === "Clothes";
    //     });
    //   } else if (this.collectionPage === "Shoes") {
    //     return this.allProducts.filter(a => {
    //       return a.category === "Shoes";
    //     });
    //   }
    // },
    ...mapState(["allProducts", "collectionPage", "isAdmin"])
  }
};
</script>

<style scoped>
.sidenav-button {
  cursor: all-scroll
}
</style>


