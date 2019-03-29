<template>
  <v-flex xs12>
    <v-container fluid>
      <v-layout justify-center class="ma-5">
        <v-flex xs8 offset-xs2 class="ma-5">
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
                  <v-layout>
                    <v-flex>
                      <span>quantity : {{product.quantity}}</span>
                      <br>
                    </v-flex>
                    <v-flex>
                      <span>price : Rp. {{((product.product.price * (100-product.product.promo))/100).toLocaleString()}}</span>
                    </v-flex>
                    <v-flex>
                      <span>total : Rp. {{(((product.product.price * (100-product.product.promo))/100) * product.quantity).toLocaleString()}}</span>
                    </v-flex>
                    <v-flex>
                      <v-btn @click="cancelProduct(product.product._id, product.quantity)">cancel</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
              <form>
                <div class="form-group">
                  <label>Shipping Cost</label>
                  <br>
                  <select class="form-control form-control-lg" @change="getCost">
                    <option
                      v-for="city in cities"
                      :key="city.city_id"
                      :data-city="city.city_id"
                    >{{city.city_name}}</option>
                  </select>
                  <br>
                  <select class="form-control form-control-lg" @change="getCourier">
                    <option
                      v-for="(paket, index) in courier"
                      :key="index"
                      :data-code="paket"
                    >{{paket}}</option>
                  </select>
                </div>
              </form>
              <div class="loader" v-if="isLoading"></div>
              <div>shipping :Rp. {{shippingCost.toLocaleString()}}</div>

              <div>grandTotal :Rp. {{total(shippingCost, grandTotal)}}</div>
              <div>
                <v-btn @click="goToTransaction">checkout</v-btn>
              </div>
            </div>
            <div v-else>
              <v-layout justify-center>
                <v-img
                  src="http://images.seroundtable.com/google-shopping-cart-animated-1381495272.gif"
                  style="max-width:300px"
                ></v-img>
                <br>
              </v-layout>
              <v-layout justify-center>
                <h1 class="text-sm-left">you don't have active cart</h1>
              </v-layout>
            </div>
          </v-layout>
          <v-layout justify-center style="min-width:90%">
            <v-flex>
              <v-layout>
                <h3>TRANSACTION HISTORY</h3>
                <br>
              </v-layout>
              <!-- {{activeTransaction}} -->
              <v-data-table :headers="headers" :items="activeTransaction" class="elevation-1">
                <template v-slot:items="props">
                  <td>{{ props.item._id }}</td>
                  <!-- <td class="text-xs-right">{{ props.item._id }}</td> -->
                  <td class="text-xs-right">{{ props.item.grandTotal }}</td>
                  <td class="text-xs-right">
                    <ol>
                      <li
                        v-for="(product,index) in props.item.transactions"
                        :key="index"
                      >{{ product.product.name }} ({{product.quantity}})</li>
                    </ol>
                  </td>
                  <td class="text-xs-right">{{ new Date(props.item.updatedAt).toDateString() }}</td>
                  <!-- <td class="text-xs-right">{{ props.item.shipped }}</td> -->
                  <td class="justify-center layout px-0">
                    <v-btn
                      v-if="!props.item.received"
                      @click.prevent="confirmTransaction(props.item._id)"
                    >Received</v-btn>
                    <!-- <i class="material-icons">done</i> -->
                    <v-icon small class="mr-2" @click="editItem(props.item)" v-else>done</v-icon>
                    <!-- <v-icon small @click="deleteItem(props.item)">delete</v-icon> -->
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
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
      headers: [
        {
          text: "transaction id",
          align: "left",
          sortable: false,
          value: "_id"
        },
        { text: "grand total", value: "grand total" },
        { text: "product (quantity) ", value: "product" },
        { text: "tanggal", value: "protein" },
        { text: "received" }
      ],
      data: "",
      userCart: [],
      activeTransaction: [],
      cityId: 0,
      courierName: "",
      shippingCost: 0,
      allCost: "",
      courier: ["jne", "tiki", "pos"],
      isLoading : false
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
    cities() {
      return this.$store.state.allCities;
    },
    grandTotal: {
      get() {
        let nilai = this.userCart.reduce((accumulator, v) => {
          return (
            accumulator +
            ((v.product.price * (100 - v.product.promo)) / 100) * v.quantity
          );
        }, 0);
        return nilai;
      },
      set(newVal) {
        return newVal;
      }
    }
    // mix this into the outer object with the object spread operator
    // ...mapState(["userCart"])
  },
  methods: {
    total(shipping, product) {
      this.allCost = shipping + product
      return (shipping + product).toLocaleString()
    },
    getCourier(e) {
      this.courierName =
        e.target.options[e.target.options.selectedIndex].dataset.code;
      this.isLoading = true;
      axios
        .post(
          "/transactions/cost",
          {
            destination: this.cityId,
            courier: this.courierName
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(({ data }) => {
          this.shippingCost = data.cost;
          this.isLoading = false;
        })
        .catch(({ response }) => {
          this.isLoading = false;
          swal('cannot find choosen courier')
        });
    },
    getCost(e) {
      this.cityId =
        e.target.options[e.target.options.selectedIndex].dataset.city;
    },
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
        })
        .catch(({ response }) => {});
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
        })
        .catch(({ response }) => {
          
        });
    },
    goToTransaction() {
      axios
        .post(
          "/transactions",
          {
            grandTotal: this.allCost,
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
          this.fetchTransaction();
        })
        .catch(({ response }) => {

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
        })
        .catch(({ response }) => {

        });
    }
  }
};
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>



