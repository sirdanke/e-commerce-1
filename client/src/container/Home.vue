<template>
  <v-container class="container">
    <v-parallax height="600" src="http://macbeth.com/media/revslideshow/20_BUNDLE_1.png"></v-parallax>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs4>
        <v-card class="ma-3" id="category" @click="navigateToCategoryPage('Pants')">
          <v-img
            id="zoom"
            class="card white--text"
            height="500px"
            src="https://www.surfstitch.com/on/demandware.static/-/Sites-ss-master-catalog/default/dwd7f438bf/images/W-901078-DK1SLSTN/SLACKER-STONE-MENS-CLOTHING-WRANGLER-JEANS-W-901078-DK1SLSTN_3.JPG"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <div class="headline">Pants Collection</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card class="category ma-4" id="category" @click="navigateToCategoryPage('Clothes')">
          <v-img
            id="zoom"
            class="white--text"
            height="500px"
            src="http://www.rachelsr.com/images/large/rachelsr.com/Vans%20Turnstall%20Parka%20WE6AZ_LRG.jpg"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <div class="headline">Clothes Collection</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card class="category ma-3" id="category" @click="navigateToCategoryPage('Shoes')">
          <v-img
            id="zoom"
            class="white--text"
            height="500px"
            src="https://www.impericon.com/media/catalog/product/m/a/macbeth_fischer_blackcement_shoes_lg.jpg"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <div class="headline">Shoes Collection</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-parallax
      height="800"
      src="https://magemusiconline.com/wp-content/uploads/facebook_event_1627153760930946.jpg"
    ></v-parallax>
    <v-layout justify-center footer>
      <v-flex text-md-center>
        <div>
          <p>
            <img
              src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/915/1801768915_15a45c65-39b3-432a-a601-02e9815032ac.png?cb=1552976147"
            >
          </p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapMutations } from "vuex";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    navigateToCategoryPage(payload) {
      this.productNavigate(payload);
    },
    ...mapMutations(["productNavigate"])
  }
};
</script>
<style scoped>
.container {
  max-width: 80%;
}
#category {
  cursor: all-scroll;
}

.article-card {
  cursor: all-scroll;
}

/* #category {
  position: relative;
  overflow: hidden;
} */

#category:hover #zoom {
  opacity: 0.3;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

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
