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
              <div>grandTotal :Rp. {{grandTotal.toLocaleString()}}</div>
              <div>
                <v-btn @click="goToTransaction">checkout</v-btn>
              </div>
            </div>
            <div v-else>
              <h1>you don't have active cart</h1>
            </div>
          </v-layout>
          <v-layout justify-center  style="min-width:90%" >
            <v-flex>
            <v-layout>
            <h3>TRANSACTION HISTORY</h3><br>
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




            <!-- <v-card v-if="!order.received" style="min-width:90%">
              <div>id : {{order._id}}</div>
              <div>status : {{getStatus(order.shipped)}}</div>
              <div>grandTotal : Rp. {{order.grandTotal.toLocaleString()}}</div>
              <v-card-actions>
                <v-layout align-center justify-center row fill-height>
                  <v-btn @click.prevent="confirmTransaction(order._id)">barang sudah sampai</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card> -->
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
        { text : "received"}
      ],
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
          this.fetchTransaction();
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
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  }
};
</script>


