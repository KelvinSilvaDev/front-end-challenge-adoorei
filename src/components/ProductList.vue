<template>
  <div class="max-w-7xl mx-auto py-8 px-4 md:px-8">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      :class="{ dark: isDarkMode }"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
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
  computed: {
    ...mapGetters("cart", ["cartItems", "cartTotal"]),
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
        const response = await api.get("/products");
        this.products = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatPrice(price) {
      return `R$ ${(price / 100).toFixed(2)}`;
    },
  },
  created() {
    if (!this.isFiltered) {
      this.fetchProducts();
    }
  },
  watch: {
    category(newValue) {
      if (newValue !== "" && this.products.length === 0) {
        this.products = this.$props.products;
      }
    },
  },
};
</script>
