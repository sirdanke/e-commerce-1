<template>
  <v-layout>
    <v-toolbar fixed>
      <v-img
        class="home"
        icon
        @click.prevent="$router.push('/')"
        src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/915/1801768915_15a45c65-39b3-432a-a601-02e9815032ac.png?cb=1552976147"
      ></v-img>
      <v-spacer></v-spacer>
      <v-text-field solo/>
      <v-btn>
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click.prevent="toCartDetail" v-if="!isAdmin">
          <v-badge left>
            <template v-slot:badge>
              <!-- <span class="black --text">{{quantityInBucket}}</span> -->
            </template>
            <v-icon large color="black lighten-1">shopping_cart</v-icon>
          </v-badge>
        </v-btn>

        <v-menu
          :close-on-content-click="false"
          :nudge-width="300"
          offset-x
          v-if="!isLogin"
        >
          <template v-slot:activator="{ on }" class="elevation-0">
            <v-btn flat v-on="on" class="elevation-0">login</v-btn>
          </template>

          <v-card class="mt-5">
            <v-card-title text-md-center style="min-height:100px">
              <span class="title font-weight-light">LOGIN</span>

              <v-form ref="form" lazy-validation class="pa-3">
                <v-text-field v-model="email" label="Email" required></v-text-field>
                <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
                <v-btn @click.prevent="login">submit</v-btn>
              </v-form>
            </v-card-title>
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
    ...mapState(["isLogin", "isAdmin", "quantityInBucket"])
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      })
      this.email = ''
      this.password = ''
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
  cursor: all-scroll;
}
</style>


