<template>
  <Header />
  <RouterView />
</template>

<script>
import { RouterView } from "vue-router";
import { mapGetters } from "vuex";

import Header from "./components/Header.vue";

export default {
  components: {
    Header,
    RouterView,
  },
  computed: {
    ...mapGetters("theme", ["currentTheme"]),
  },
  data() {
    return {
      searchTerm: "",
      isDarkMode: false,
    };
  },
  watch: {
    currentTheme() {
      this.getTheme();
    },
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    },
    handleSearch(term) {
      this.searchTerm = term;
    },
    resetSearch() {
      this.searchTerm = "";
    },
    getTheme() {
      return this.currentTheme;
    },
    applyTheme() {
      this.theme = localStorage.getItem("theme") || "light";
    },
  },
  created() {
    const category = decodeURIComponent(
      this.$route.query.categoryName || this.$route.params.categoryName || ""
    );
    if (category) {
      this.$router.push({
        name: "Category",
        params: { categoryName: encodeURIComponent(category) },
      });
    }
  },
  mounted() {
    if (localStorage.getItem("theme")) {
      this.theme = localStorage.getItem("theme");
    }
    window.addEventListener("storage", this.applyTheme);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.applyTheme);
  },
};
</script>

<style>
.app {
  transition: background-color 0.5s ease-in-out;
}

.dark {
  background-color: #1e1e1e;
  color: #fff;
}
</style>
