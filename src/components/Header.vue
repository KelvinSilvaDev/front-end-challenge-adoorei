<template>
  <div class="header-container sticky top-0 z-50" :class="{ dark: isDarkMode }">
    <div class="header dark:bg-gray-900" :class="{ dark: isDarkMode }">
      <div class="container mx-auto flex justify-between items-center py-4">
        <div
          class="logo text-xl font-bold text-gray-800 dark:text-white"
          :class="{ dark: isDarkMode }"
        >
          Minha Loja
        </div>

        <div class="search flex items-center bg-gray-200 rounded-md py-1 px-2">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Buscar produtos"
            @keyup.enter="searchProducts"
            class="w-full focus:outline-none"
            :class="{ dark: isDarkMode }"
          />
          <button
            @click="searchProducts"
            class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md ml-2"
            :class="{ dark: isDarkMode }"
          >
            Buscar
          </button>
        </div>
        <div class="cart relative ml-4">
          <i
            class="fas fa-shopping-cart text-xl text-white-800 hover:text-red-500 dark:text-gray-100"
            :class="{ dark: isDarkMode }"
          ></i>
          <span
            class="cart-count absolute top-0 right-0 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
            :class="{ dark: isDarkMode }"
            >{{ cartCount }}</span
          >
        </div>
        <div class="menu">
          <ul class="flex items-center">
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="mr-4"
            >
              <a
                href="#"
                class="text-gray-800 hover:text-blue-500"
                :class="{ dark: isDarkMode }"
                >{{ category.charAt(0).toUpperCase() + category.slice(1) }}</a
              >
            </li>
          </ul>
        </div>
        <ThemeToggle :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
      </div>
    </div>

    <div class="content-container" :style="{ 'padding-top': headerHeight }">
      <!-- conteúdo principal aqui -->
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import ThemeToggle from "./ThemeToggle.vue";

export default {
  props: {
    isDarkMode: Boolean,
  },

  data() {
    return {
      categories: [],
      cartCount: 0,
      searchTerm: "",
      searchedProducts: [],
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchPascalCaseCategories();
    this.fetchCartCount();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.get("/products/categories");
        this.categories = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPascalCaseCategories() {
      try {
        const response = await api.get("/products/categories");
        this.categories = response.data.map((category) =>
          category.replace(
            /\w+/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          )
        );
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCartCount() {
      try {
        const response = await api.get("/carts/count");
        this.cartCount = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async searchProducts() {
      try {
        const response = await api.get(`/products?title=${this.searchTerm}`);
        this.searchedProducts = response.data;
        this.searchTerm = "";
      } catch (error) {
        console.log(error);
      }
    },
    toggleTheme() {
      this.$emit("toggle-theme");
      // adiciona ou remove a classe dark do elemento body para mudar o background
      document.body.classList.toggle("dark");
      // seleciona o header e muda a cor do texto para branco ou preto dependendo do tema escolhido
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("header--dark");
        const links = header.querySelectorAll("a");
        links.forEach((link) => link.classList.toggle("header__link--dark"));
      }
    },
  },
  components: { ThemeToggle },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");

/* Global Styles */
.container {
  max-width: 1200px;
}

/* Component Styles */

.logo {
  color: #333;
}

.search input:focus {
  box-shadow: 0 0 0 2px #007bff;
}

.menu a {
  font-size: 16px;
}

.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #1a202c;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: black;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.search {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
}

.search input {
  height: 30px;
  padding: 5px;
  border: none;
  border-radius: 5px 0 0 5px;
  color: #333;
}

.search button {
  height: 30px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.cart {
  position: relative;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
}

.cart .cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu ul {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
}

.menu li {
  margin-right: 10px;
}

.menu a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  padding: 5px;
  border-radius: 5px;
}

.menu a:hover {
  background-color: #fff;
  color: #333;
}

.search input {
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #f5f5f5;
  box-shadow: none;
}

.search input:focus {
  outline: none;
}

.search .search-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  color: #666;
  font-size: 16px;
}

.search button {
  height: 40px;
  padding: 0 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
}

.search button:hover {
  background-color: #0069d9;
}

.dark {
  background-color: #1f2937;
  color: #f9fafb;
}
</style>
