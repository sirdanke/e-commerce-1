<template>
  <v-container>
    <v-layout align-center justify-center fill-height class="mt-5">
      <v-flex xs5 class="mt-5">
        <h3>{{page}} FORM</h3>
        <v-form ref="form" lazy-validation>
          <div v-if="page == 'SIGNUP'">
            <small>{{error.name}}</small>
            <v-text-field v-model="name" label="Name" outline required></v-text-field>
          </div>
          <small>{{error.email}}</small>
          <v-text-field v-model="email" label="E-mail" outline required></v-text-field>
          <small>{{error.password}}</small>
          <v-text-field v-model="password" :type="'password'" label="Password" outline required></v-text-field>

          <div class="text-xs-center" v-if="page == 'SIGNUP'">
            <v-btn round color="primary" dark large @click.prevent="register">Submit</v-btn>
          </div>
          <div class="text-xs-center" v-else>
            <v-btn round color="primary" dark large @click.prevent="login">Login</v-btn>
          </div>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "@/api/axios.js";
export default {
  name: "register-form",
  data() {
    return {
      name: "",
      page: "SIGNUP",
      password: "",
      email: "",
      error: { name: "", email: "", password: "" }
    };
  },
  methods: {
    register() {
      axios
        .post("/users", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.page = "LOGIN";
        })
        .catch(({ response }) => {
          this.error = response.data.error;
        });
    },
    login() {
      this.$store.dispatch('login', {email : this.email, password : this.password})
    }
  }
};
</script>
