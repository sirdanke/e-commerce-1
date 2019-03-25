<template>
  <v-layout>
    <v-toolbar fixed>
      <v-img
      class="home"
        icon @click.prevent="$router.push('/')"
        src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/915/1801768915_15a45c65-39b3-432a-a601-02e9815032ac.png?cb=1552976147"
      ></v-img>
      <v-spacer></v-spacer>
      <v-text-field solo/>
      <v-btn >
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click.prevent="toCartDetail" v-if="!isAdmin">
          <v-badge left>
            <template v-slot:badge>
              <span>6</span>
            </template>
            <v-icon large color="grey lighten-1">shopping_cart</v-icon>
          </v-badge>
        </v-btn>

        <v-menu :close-on-content-click="false" :nudge-width="200" offset-x v-if="!isLogin">
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">login</v-btn>
          </template>

          <v-card>
            <v-card-title text-md-center>
              <span class="title font-weight-light">LOGIN</span>
            </v-card-title>
            <v-layout>
              <v-flex xs8 offset-xs2>
                <v-form ref="form" lazy-validation>
                  <v-text-field v-model="email" label="Email" required></v-text-field>
                  <v-text-field v-model="password" label="Password" required></v-text-field>
                  <v-btn @click.prevent="login">submit</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card>
        </v-menu>
        <v-btn flat @click.prevent="toAdminDashboard" v-if="isAdmin">Dashboard</v-btn>
        <v-btn flat @click.prevent="register" v-if="!isLogin">Sign Up</v-btn>
        <v-btn flat @click.prevent="logout" v-if="isLogin">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  computed: {
    localComputed() {
      /* ... */
    },
    ...mapState(["isLogin", "isAdmin"])
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_token");
      this.$store.commit("logout");
    },
    toAdminDashboard() {
      this.$router.push("/admin");
    },
    toCartDetail() {
      this.$router.push("/cart");
    }
  }
};
</script>

<style scoped>
.home {
  cursor: all-scroll
}
</style>


