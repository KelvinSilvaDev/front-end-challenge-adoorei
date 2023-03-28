<template>
  <template v-if="isDarkMode">
    <div class="w-full bg-gray-800 h-full md:h-screen">
      <div class="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <h1 class="text-3xl font-bold text-white">
          Produtos na categoria: <span class="capitalize">{{ category }}</span>
        </h1>
        <div
          class="my-4 flex flex-col items-start justify-between text-gray-400 md:flex-row:items-center"
        >
          <label class="text-lg md:text-xl mr-4">Opções de filtro</label>
          <div
            class="w-full flex flex-col gap-4 items-start md:flex-row md:gap-8 md:items-end md:justify-end"
          >
            <div
              class="w-full flex items-center justify-between space-x-4 md:justify-end"
            >
              <label class="text-lg md:text-xl">Direção:</label>
              <select
                id="sort-direction"
                v-model="sortDirection"
                class="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="asc">Crescente</option>
                <option value="desc">Decrescente</option>
              </select>
            </div>
            <div
              class="w-full flex items-center justify-between space-x-4 md:justify-end md:mt-0"
            >
              <label class="text-lg md:text-xl">Ordenar por:</label>
              <select
                v-model="sortBy"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="name">Nome</option>
                <option value="price">Preço</option>
                <option value="rating">Avaliação</option>
              </select>
            </div>
          </div>
        </div>
        <ProductList
          :category="category"
          :products="sortedProducts"
          :isFiltered="true"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 h-screen">
      <h1 class="text-3xl font-bold">
        Produtos na categoria: <span class="capitalize">{{ category }}</span>
      </h1>
      <div class="my-4 flex flex-col md:flex-row items-center justify-between">
        <label class="text-lg md:text-xl mr-4">Opções de filtro</label>
        <div class="flex gap-8">
          <div
            class="w-full flex items-center justify-between space-x-4 md:justify-end"
          >
            <label class="text-lg md:text-xl">Direção:</label>
            <select
              id="sort-direction"
              v-model="sortDirection"
              class="w-32 md:w-auto p-2 rounded-md border border-gray-400"
            >
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </div>
          <div
            class="w-full flex items-center justify-between space-x-4 md:justify-end mt-4 md:mt-0"
          >
            <label class="text-lg md:text-xl">Ordenar por:</label>
            <select
              v-model="sortBy"
              class="w-32 md:w-auto p-2 rounded-md border border-gray-400"
            >
              <option value="name">Nome</option>
              <option value="price">Preço</option>
              <option value="rating">Avaliação</option>
            </select>
          </div>
        </div>
      </div>
      <ProductList
        :category="category"
        :products="sortedProducts"
        :isFiltered="true"
      />
    </div>
  </template>
</template>

<script>
import { mapGetters } from "vuex";
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
      sortDirection: "asc",
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
    getCurrentTheme() {
      if (this.currentTheme === "dark") {
        this.cardClasses = "bg-gray-900 text-white";
      } else if (this.currentTheme === "light") {
        this.cardClasses = "bg-white text-black";
      }
    },
    updatePageTitle() {
      const categoryName = this.$route.params.category;

      document.title = `Produtos na categoria ${categoryName}`;
    },
  },
  sortProducts(products) {
    if (this.sortDirection === "desc") {
      return products.reverse;
    }
    return products;
  },
  computed: {
    sortedProducts() {
      const sorted = this.products.sort((a, b) => {
        if (this.sortBy === "name") {
          return a.title.localeCompare(b.title);
        } else if (this.sortBy === "price") {
          return a.price - b.price;
        } else if (this.sortBy === "rating") {
          return b.rating.rate - a.rating.rate;
        }
      });

      if (this.sortDirection === "desc") {
        return sorted.reverse();
      }
      return sorted;
    },
    categoryName() {
      return this.$route.params.category;
    },
    ...mapGetters("cart", ["cartItems", "cartTotal"]),
    getTheme: mapGetters("theme", ["currentTheme"]),
    isDarkMode() {
      return this.$store.getters["theme/currentTheme"] === "dark";
    },
  },
  created() {
    this.updatePageTitle();
  },
  watch: {
    currentTheme() {
      this.getTheme();
    },
    $route: {
      handler: function (to) {
        this.category = to.params.category;
        this.fetchProducts();
        this.updatePageTitle();
      },
      immediate: true,
    },
  },
};
</script>
