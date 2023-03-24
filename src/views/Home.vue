<template>
  <ProductList :products="products" />
</template>
<!-- @add-to-cart="addToCart" -->
<script>
import ProductList from "../components/ProductList.vue";
import Vuex, { mapActions, mapMutations } from "vuex";
import api from "../services/api";

export default {
  name: "Products",
  components: {
    ProductList,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
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
    addToCart(product) {
      const vm = this;
      console.log(product);
      // this.addToCartActio  n(product);
    },
    ...mapActions("cart", ["addToCart"]),
    ...mapMutations("cart", ["incrementItemQuantity"]),
  },
};
</script>
