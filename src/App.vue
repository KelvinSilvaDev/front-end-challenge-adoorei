<template>
  <div id="app">
    <Header
      :theme="theme"
      @toggle-theme="toggleTheme"
      @search="handleSearch"
      @reset-search="resetSearch"
    />
    <router-view :search-term="searchTerm" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Header,
  },
  data() {
    return {
      searchTerm: "",
      theme: "light",
    };
  },
  methods: {
    toggleTheme() {
      if (this.theme === "light") {
        this.theme = "dark";
        document.documentElement.classList.add("dark");
      } else {
        this.theme = "light";
        document.documentElement.classList.remove("dark");
      }
    },
    handleSearch(term) {
      this.searchTerm = term;
    },
    resetSearch() {
      this.searchTerm = "";
    },
    created() {
      const category = decodeURIComponent(
        this.$router.push({
          name: "Category",
          params: {
            categoryName: categoryName.toLowerCase().replace(/ /g, "-"),
          },
        })
      );
      if (category) {
        this.$router.push({
          name: "Category",
          params: { category: encodeURIComponent(category) },
        });
      }
    },
  },
});
</script>
