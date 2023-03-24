<script>
import Header from "./components/Header.vue";
import ProductList from "./components/ProductList.vue";

export default {
  components: {
    Header,
    ProductList,
  },
  data() {
    return {
      cartCount: 0,
      searchTerm: "",
    };
  },
  methods: {
    searchProducts() {
      console.log(`Searching for "${this.searchTerm}"`);
    },
  },
};
</script>

<template>
  <Header />
  <ProductList :search-term="searchTerm" />
</template>
