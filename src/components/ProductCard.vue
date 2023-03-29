<template>
  <template v-if="isDarkMode">
    <div class="shadow-lg rounded-lg overflow-hidden bg-gray-900 text-white">
      <router-link :to="{ name: 'Product', params: { productId: product.id } }">
        <img
          class="h-80 w-full object-cover cursor-pointer first-letter:object-cover hover:scale-110 ease-in duration-500"
          :src="product.image"
          :alt="product.title"
          @click="navigateToProduct(product.id)"
        />
      </router-link>
      <div class="px-4 py-4 relative h-[180px] w-[100%]">
        <router-link
          :to="{ name: 'Product', params: { productId: product.id } }"
        >
          <h2 class="font-bold text-base tracking-wide mb-2">
            {{ product.title }}
          </h2>
        </router-link>
        <div
          class="flex align-center justify-between content-center items-center absolute bottom-1 left-2 w-[95%]"
        >
          <div class="mt-3">
            <span class="font-bold">Preço: </span>
            <span class="font-bold text-xl text-green-600">{{
              formatPrice(product.price)
            }}</span>
          </div>
          <div class="mt-4">
            <button
              class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              @click="addToCart(product)"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="shadow-lg rounded-lg overflow-hidden bg-slate-100 text-black">
      <router-link :to="{ name: 'Product', params: { productId: product.id } }">
        <img
          class="h-80 w-full object-cover cursor-pointer first-letter:object-cover hover:scale-110 ease-in duration-500"
          :src="product.image"
          :alt="product.title"
          @click="navigateToProduct(product.id)"
        />
      </router-link>
      <div class="px-4 py-4 relative h-[180px] w-[100%]">
        <router-link
          :to="{ name: 'Product', params: { productId: product.id } }"
        >
          <h2 class="font-bold text-base tracking-wide mb-2">
            {{ product.title }}
          </h2>
        </router-link>
        <div
          class="flex align-center justify-between content-center items-center absolute bottom-1 left-2 w-[95%]"
        >
          <div class="mt-3">
            <span class="font-bold">Preço: </span>
            <span class="font-bold text-xl text-green-600">{{
              formatPrice(product.price)
            }}</span>
          </div>
          <div class="mt-4">
            <button
              class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              @click="addToCart(product)"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cardClasses: "",
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "cartTotal"]),
    ...mapState({
      currentCart: (state) => state.currentCart,
    }),
    getTheme() {
      return this.currentTheme;
    },
    isDarkMode() {
      return this.$store.getters["theme/currentTheme"] === "dark";
    },
  },
  watch: {
    currentTheme() {
      this.getTheme();
    },
  },
  methods: {
    ...mapActions("cartModule", ["addToCart"]),
    addToCart(product) {
      this.$store.dispatch("cartModule/addToCart", product);
    },
    formatPrice(price) {
      const formatedPrice = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      return formatedPrice.format(price);
    },
    navigateToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
    getCurrentTheme() {
      if (this.currentTheme === "dark") {
        this.cardClasses = "bg-gray-900 text-white";
      } else if (this.currentTheme === "light") {
        this.cardClasses = "bg-white text-black";
      }
    },
  },
  setup() {
    return {
      increment() {
        this.$store.commit("increment");
      },
    };
  },
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.product-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.product-category {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.add-to-cart {
  background-color: #000000;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.add-to-cart:hover {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
}
</style>
