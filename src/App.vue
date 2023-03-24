<script>
import Header from "./components/Header.vue";
// import ProductList from "./components/ProductList.vue";
import Home from "./views/Home.vue";

export default {
  components: {
    Header,
    // ProductList,
    Home,
  },
  data() {
    return {
      cartCount: 0,
      searchTerm: "",
      theme: "light",
    };
  },

  methods: {
    searchProducts() {
      console.log(`Searching for "${this.searchTerm}"`);
    },
    toggleTheme() {
      if (this.theme === "light") {
        this.theme = "dark";
        document.documentElement.classList.add("dark");
      } else {
        this.theme = "light";
        document.documentElement.classList.remove("dark");
      }
    },
  },
};
</script>

<template>
  <Header :theme="theme" @toggle-theme="toggleTheme" />
  <!-- <ProductList :search-term="searchTerm" /> -->
  <Home />
</template>
