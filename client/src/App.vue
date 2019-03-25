<template>
  <div id="app">
    
    <Navbar/>
    <v-layout>
      
      <router-view/>
      
    </v-layout>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { mapActions } from "vuex";
import axios from "@/api/axios";
export default {
  components: {
    Navbar
  },
  created() {
    this.fetchData();
    this.cekLogin();
  },
  computed : {
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  methods: {
    cekLogin() {
      axios
        .post(
          "/users/verification",
          {},
          { headers: { access_token: localStorage.getItem("access_token") } }
        )
        .then(({ data }) => {
          this.$store.commit("login", data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    ...mapActions(["fetchData"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
