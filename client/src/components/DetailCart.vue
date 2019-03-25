<template>
  <v-flex xs12>
    <v-container>
      <v-layout class="ma-5">
        <v-flex xs8 class="ma-5">
          <v-layout justify-center column fill-height>
            <div v-if="userCart.length > 0">
              <v-card
                color="blue-grey darken-2"
                class="ma-3 white--text"
                v-for="product in userCart"
                :key="product._id"
              >
                <v-card-actions>
                  <v-btn flat dark>{{product.product.name}}</v-btn>
                </v-card-actions>
                <v-card-actions>
                  <span>quantity : {{product.quantity}}</span><br>
                  <span> price : Rp. {{((product.product.price * (100-product.product.promo))/100).toLocaleString()}}  </span>
                  <span></span>
                 
                  <span>total : Rp. {{(((product.product.price * (100-product.product.promo))/100) * product.quantity).toLocaleString()}}</span>
                
                  <v-btn @click="cancelProduct(product.product._id, product.quantity)">cancel</v-btn>
                </v-card-actions>
              </v-card>
              <div>grandTotal :Rp. {{grandTotal.toLocaleString()}}</div>
              <div>
                <v-btn @click="goToTransaction">checkout</v-btn>
              </div>
            </div>
            <div v-else>
              <h1> you don't have active cart</h1>
            </div>
          </v-layout>
        </v-flex>
        <v-flex xs4>
          <h1>your transaction list</h1>
          <div v-for="order in activeTransaction" :key="order._id">
            <v-card v-if="!order.received">
              <div>id : {{order._id}}</div>
              <div>status : {{getStatus(order.shipped)}}</div>
              <div>grandTotal : Rp. {{order.grandTotal.toLocaleString()}}</div>
              <v-card-actions>
                <v-btn @click.prevent="confirmTransaction(order._id)">barang sudah sampai</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import { mapState } from "vuex";
import axios from "@/api/axios.js";
export default {
  data() {
    return {
      data: "",
      userCart: [],
      activeTransaction: []
    };
  },
  created() {
    this.fecthCart();
  },
  mounted() {
    this.fetchTransaction();
  },
  name: "detail-cart",
  computed: {
    grandTotal() {
      let nilai = this.userCart.reduce((accumulator, v) => {
        return (
          accumulator +
          ((v.product.price * (100 - v.product.promo)) / 100) * v.quantity
        );
      }, 0);
      return nilai;
    }
    // mix this into the outer object with the object spread operator
    // ...mapState(["userCart"])
  },
  methods: {
    getStatus(payload) {
      if (payload) {
        return "dalam proses pengiriman";
        } else {
        return "dalam proses packing";
      }
    },
    cancelProduct(id, quantity) {
      axios
        .patch(
          `/products/returned/${id}`,
          { returnedStock: quantity },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(({ data }) => {
          this.userCart = data.cart;
          console.log(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    fecthCart() {
      axios
        .get("users/cart", {
          headers: { access_token: localStorage.getItem("access_token") }
        })
        .then(({ data }) => {
          this.userCart = data.cart;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    fetchTransaction() {
      axios
        .get(`/transactions/user`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.activeTransaction = data;
          console.log(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    goToTransaction() {
      axios
        .post(
          "/transactions",
          {
            grandTotal: this.grandTotal,
            user: localStorage.getItem("user_token"),
            product: this.userCart
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(({ data }) => {
          this.userCart = [];
          this.fetchTransaction()
          // this.$store.dispatch('')
          // console.log(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    confirmTransaction(transactionId) {
      axios
        .patch(
          `/transactions/${transactionId}`,
          { received: true },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(({ data }) => {
          this.fetchTransaction();
          // this.$store.dispatch()
          // console.log(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  }
};
</script>


