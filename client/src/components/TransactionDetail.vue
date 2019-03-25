<template>
  <v-flex xs10>
    <v-data-table :headers="headers" :items="allTransactions" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item._id }}</td>
        <!-- <td class="text-xs-right">{{ props.item._id }}</td> -->
        <td class="text-xs-right">{{ props.item.grandTotal }}</td>
        <td class="text-xs-right">{{ props.item.user.name }}</td>
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
          <v-btn v-if="props.item.shipped == false" @click.prevent="shippingConfirmation(props.item._id)">ship now</v-btn>
          <!-- <i class="material-icons">done</i> -->
          <v-icon small class="mr-2" @click="editItem(props.item)" v-else>done</v-icon>
          <!-- <v-icon small @click="deleteItem(props.item)">delete</v-icon> -->
        </td>
         <td>
          <v-icon small class="mr-2" @click="editItem(props.item)" v-if="props.item.received">done</v-icon>
        </td>
      </template>
    </v-data-table>
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
        { text: "user", value: "user" },
        { text: "product (quantity) ", value: "product" },
        { text: "tanggal", value: "protein" },
        { text: "shipped", value: "iron" },
        { text : "received"}
      ],
      allTransactions: [],
      data: "",
      userCart: []
    };
  },
  created() {
    this.fecthTransaction();
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
    fecthTransaction() {
      axios
        .get("/transactions", {
          headers: { access_token: localStorage.getItem("access_token") }
        })
        .then(({ data }) => {
          this.allTransactions = data;
          // this.desserts = data.cart;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    shippingConfirmation(id) {
      axios
        .patch(`/transactions/${id}`, {shipped : true}, {
          headers : {
            access_token : localStorage.getItem('access_token')
          }
        })
        .then(({data})=> {
          let mYindex = 0
          this.allTransactions.forEach((element,i) => {
            if(element._id == data._id) {
              mYindex = i
            }
          })
          this.allTransactions.splice(mYindex, 1, data)
        })
        .catch(({response})=> {
          console.log(response);
          
        })
    }
  }
};
</script>


