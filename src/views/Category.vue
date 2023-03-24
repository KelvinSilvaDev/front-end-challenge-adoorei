<template>
  <div>
    <h2>Produtos da categoria {{ category }}</h2>
    <ProductList :category="category" :products="products" :isFiltered="true" />
  </div>
</template>

<script>
import ProductList from "../components/ProductList.vue";

import api from "../services/api";

export default {
  name: "Category",
  components: {
    ProductList,
  },

  data() {
    return {
      category: "",
      products: [],
      sortBy: "name",
    };
  },
  mounted() {
    this.category = this.$route.params.category;
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      api
        .get(`products/category/${this.category}`)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    sortedProducts() {
      if (this.sortBy === "name") {
        return this.products.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === "price") {
        return this.products.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === "rating") {
        return this.products.sort((a, b) => b.rating.rate - a.rating.rate);
      }
    },
    categoryName() {
      return this.$route.params.category;
    },
  },
  watch: {
    $route: {
      handler: function (to, from) {
        this.category = to.params.category;
        this.fetchProducts();
      },
      immediate: true,
    },
  },
};
</script>
