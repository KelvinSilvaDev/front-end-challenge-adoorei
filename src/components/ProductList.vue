<template>
  <template v-if="isDarkMode">
    <div class="mx-auto py-8 px-4 md:px-8 bg-gray-800">
      <div
        class="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="mx-auto py-8 px-4 md:px-8">
      <div
        class="grid mx-auto max-w-7xl container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import ProductCard from "./ProductCard.vue";
import api from "../services/api";

export default {
  components: {
    ProductCard,
  },
  name: "ProductList",
  props: {
    category: {
      type: String,
      default: "",
    },
    products: {
      type: Array,
      default: () => [],
    },
    isFiltered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "cartTotal"]),
    getTheme() {
      return this.currentTheme;
    },
    isDarkMode() {
      return this.$store.getters["theme/currentTheme"] === "dark";
    },
  },

  methods: {
    async addToCart(productId) {
      try {
        const response = await api.get(`/products/${productId}`);
        const product = response.data;
        this.addToCart(product);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions("cart", ["addToCart"]),
    ...mapMutations("cart", ["incrementItemQuantity"]),

    async fetchProducts() {
      try {
        const { data } = await api.get("/products");
        this.$emit("update:products", data);
      } catch (error) {
        console.log(error);
      }
    },

    formatPrice(price) {
      return `R$ ${(price / 100).toFixed(2)}`;
    },
  },

  watch: {
    currentTheme() {
      this.getTheme();
    },
    category(newValue) {
      if (newValue !== "" && this.products.length === 0) {
        this.products = this.$props.products;
      }
    },
  },
  mounted() {
    if (!this.isFiltered) {
      this.fetchProducts();
    }
  },
};
</script>
