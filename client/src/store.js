import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProducts: [],
    collectionPage: 'default',
    isLogin: false,
    isAdmin: false,
    userCart: [],
    isLoading: false
  },
  mutations: {
    fetchData(state, payload) {
      state.allProducts = payload.reverse()
    },
    productNavigate(state, payload) {
      state.collectionPage = payload
      router.push('/product')
    },
    login(state, payload) {
      state.isLogin = true
      // state.userCart = payload.cart

      if (payload.role == 'admin') {
        state.isAdmin = true
      }

      router.push('/')

    },
    logout(state, payload) {
      state.isLogin = false
      state.isAdmin = false
      router.push('/')
    },
    createProduct(state, payload) {
      state.allProducts.unshift(payload)
      router.push('/admin')
    },
    userCart(state, payload) {

      state.userCart = payload

      router.push('/cart')
    },
    editProduct(state, payload) {
      let mYindex = 0
      state.allProducts.forEach((element, i) => {
        if (element._id == payload._id) {
          mYindex = i
        }
      })
      state.allProducts.splice(mYindex, 1, payload)
      router.push('/admin')
    },
    deleteProduct(state, payload) {
      let mYindex = 0
      state.allProducts.forEach((element, i) => {
        if (element._id == payload) {
          mYindex = i
        }
      })
      state.allProducts.splice(mYindex, 1)
      router.push('/admin')
    }
  },

  // actions
  actions: {
    deleteProduct({ commit }, payload) {
      axios
        .delete(`/products/${payload}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          commit('deleteProduct', payload)
        })
        .catch(({ response }) => {
          console.log(response);

        })
    },
    fetchData({ commit }) {
      axios
        .get('/products')
        .then(({ data }) => {
          commit('fetchData', data)
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        })
    },
    login({ commit }, payload) {
      console.log(payload, "==INI PAYLOAD");

      axios
        .post("/users/login", {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user_token', data.user)
          Swal.fire({
            title: "Login success",
            text: "Do you want to continue",
            type: "success",
            confirmButtonText: "ok"
          });
 
          commit('login', { isLogin: true, role: data.role })
        })
        .catch(({ response }) => {
          Swal.fire({
            title: "Login Failed",
            text: "password or email wrong",
            type: 'error',
            confirmButtonText: "ok"
          })
        })
    },
    createProduct({ commit, state }, payload) {
      state.isLoading = true

      axios
        .post("/products", payload, {
          headers: {
            access_token:
              localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          state.isLoading = false
          commit('createProduct', data)
 

          // alert(data);
        })
        .catch(({ response }) => {
          state.isLoading = false
 
          Swal.fire({
            title: 'field cannot be empty, please check again',
            type: "error",
            confirmButtonText: "ok"
          });
        });
    },
    editProduct({ commit,state }, payload) {
      state.isLoading = true
      axios
        .patch(`/products/${payload.id}`, payload.data, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          state.isLoading = false
          commit('editProduct', data)


        })
        .catch(({ response }) => {
          state.isLoading = false
          console.log(response);

        })

    },
    addToCart({ commit }, payload) {
 
      axios
        .patch('/users/cart', { product: { product: payload.data, quantity: payload.quantity } }, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {


          commit('userCart', data)

        })
        .catch(({ response }) => {

          Swal.fire({
            title: response.data.message,
            type: "error",
            confirmButtonText: "ok"
          });

        })
    }
  }
})
