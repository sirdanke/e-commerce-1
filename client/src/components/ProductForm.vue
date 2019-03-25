<template>
  <v-flex xs5 offset-ls2 class="ma-5">
    <h3>PRODUCT FORM</h3>

    <v-form ref="form" enctype="multipart/form-data">
      <div>
        <small>{{error.name}}</small>
        <v-text-field v-model="name" label="Name" required></v-text-field>
      </div>
      <small></small>
      <v-flex xs12>
        <v-select v-model="category" :items="select" label="Category" required></v-select>
      </v-flex>
      <small>{{error.description}}</small>
      <v-text-field v-model="description" label="Description" required></v-text-field>
      <small>{{error.stock}}</small>
      <v-text-field v-model="stock" label="stock" required></v-text-field>
      <small>{{error.brand}}</small>
      <v-text-field v-model="brand" label="brand" required></v-text-field>
      <!-- <v-text-field v-model="category" label="E-mail"  required></v-text-field> -->
      <v-text-field v-model="promo" label="promo" required></v-text-field>
      <v-text-field v-model="price" label="price" required></v-text-field>
      <v-img :src="preview"></v-img>

      <input v-show="true" label="upload product image" type="file" @change="getImage">
      <div class="text-xs-center">
        <div class="loader" v-if="isLoading"></div>
        <v-btn round color="primary" dark large v-if="id" @click.prevent="editProduct">edit</v-btn>
        <v-btn round color="primary" dark large @click.prevent="createProduct" v-else>Create</v-btn>
      </div>
    </v-form>
  </v-flex>
</template>

<script>
import axios from "@/api/axios.js";
export default {
  name: "product",
  data() {
    return {
      name: "",
      description: "",
      stock: 0,
      price: 0,
      image: "",
      brand: "",
      promo: 0,
      id: this.$route.params.id,
      preview: "",
      select: ["Clothes", "Pants", "Shoes"],
      category: "",
      error: {
        name: "",
        description: "",
        stock: "",
        price: "",
        image: "",
        brand: "",
        promo: "",
        category: ""
      }
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  mounted() {
    if (this.id) {
      this.getProductToEdit();
    } else {
      this.name = "";
      this.description = "";
      this.stock = "";
      this.price = "";
      this.image = "";
      this.brand = "";
      this.promo = "";
      this.category = "";
    }
  },
  watch: {
    "$route.params.id"(newVal) {
      this.id = newVal;
    }
  },
  methods: {
    getProductToEdit() {
      axios
        .get(`/products/${this.$route.params.id}`, {
          headers: { access_token: localStorage.getItem("access_token") }
        })
        .then(({ data }) => {
          this.preview = data.image;
          this.name = data.name;
          this.description = data.description;
          this.stock = data.stock;
          this.price = data.price;
          this.image = data.image;
          this.brand = data.brand;
          this.promo = data.promo;
          this.category = data.category;
        })
        .catch(({ response }) => {
        });
    },
    getImage(e) {
      this.image = e.target.files[0];
      this.preview = URL.createObjectURL(e.target.files[0]);
      this.image = e.target.files[0];
    },
    createProduct() {
      let newProduct = {
        name: this.name,
        description: this.description,
        stock: this.stock,
        price: this.price,
        brand: this.brand,
        promo: this.promo,
        category: this.category
      };

      let newProductData = new FormData();
      newProductData.append("data", JSON.stringify(newProduct));
      newProductData.append("image", this.image);
      this.$store.dispatch("createProduct", newProductData);
    },
    editProduct() {
      let updatedProduct = {
        name: this.name,
        description: this.description,
        stock: this.stock,
        price: this.price,
        brand: this.brand,
        promo: this.promo,
        category: this.category,
        image: this.image
      };

      let updatedProductData = new FormData();
      updatedProductData.append("data", JSON.stringify(updatedProduct));
      updatedProductData.append("image", this.image);
      this.$store.dispatch("editProduct", {
        data: updatedProductData,
        id: this.id
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


