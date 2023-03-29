<template>
  <div class="header-container sticky top-0 z-50" :class="{ dark: isDarkMode }">
    <div class="header dark:bg-gray-900" :class="{ dark: isDarkMode }">
      <div
        class="container mx-auto flex justify-between items-center py-4 mr-4 md:mx-auto"
      >
        <router-link
          :to="{ name: 'Home' }"
          exact-active-class="text-blue-500"
          class="logo text-xl font-bold text-gray-800 dark:text-white"
          :class="{ dark: isDarkMode }"
        >
          Minha Loja
        </router-link>

        <!-- Search Input -->
        <div
          class="search hidden md:w-1/6 md:flex items-center bg-transparent rounded-md py-1 px-2 flex-none"
        >
          <div class="relative flex items-center w-full">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar produtos"
              :class="{ dark: isDarkMode }"
              class="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
              @input="delayedSearch"
            />

            <span
              class="absolute bottom-0 w-full border-b-2 border-gray-400"
            ></span>
          </div>

          <button
            class="bg-black text-white py-1 px-2 rounded-md ml-2 text-sm"
            :class="{ dark: isDarkMode }"
            @click="searchProducts"
          >
            Buscar
          </button>
        </div>

        <div class="menu" :class="{ 'menu--open': isMobileMenuOpen }">
          <ul class="flex items-center">
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="mr-4"
            >
              <router-link
                :to="{ name: 'Category', params: { category: category } }"
                exact-active-class="text-blue-500"
                class="text-red-400 hover:text-blue-500 capitalize text-xs md:text-md"
                :class="{ dark: isDarkMode }"
              >
                {{ category }}
              </router-link>
            </li>
          </ul>
        </div>
        <ThemeToggle class="block md:hidden" />
        <div class="flex align-middle justify-end gap-2">
          <!-- <div class="cart relative ml-4">
            <i
              class="fas fa-shopping-cart text-white text-xl md:text-white hover:text-red-500 dark:text-gray-100"
              :class="{ dark: isDarkMode }"
            ></i>
            <span
              class="cart-count absolute top-0 right-0 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
              :class="{ dark: isDarkMode }"
              >{{ cartCount }}</span
            >
          </div> -->
          <CartComponent />

          <!-- Mobile Menu Icon -->
          <div
            class="mobile-menu-icon block md:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg
              class="w-6 h-6"
              fill="white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="!isMobileMenuOpen"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2z"
              />
              <path
                v-if="isMobileMenuOpen"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.293 4.293a1 1 0 011.414 0L10 10.586l6.293-6.293a1 1 0 111.414 1.414L11.414 12l6.293 6.293a1 1 0 01-1.414 1.414L10 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 12 2.293 5.707a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>
        <!-- <ThemeToggle class="block md:hidden" /> -->

        <!-- Mobile Menu -->
        <div
          class="mobile-menu md:hidden"
          :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
        >
          <ul id="mobile-menu-items" class="flex-col gap-2 items-center">
            <li v-for="(category, index) in categories" :key="index" class="">
              <router-link
                :to="{ name: 'Category', params: { category: category } }"
                exact-active-class="text-blue-500"
                class="text-gray-800 hover:text-blue-500 capitalize flex w-[100%]"
                :class="{ dark: isDarkMode }"
                @click="isMobileMenuOpen = !isMobileMenuOpen"
              >
                {{ category }}
              </router-link>
            </li>
            <li>
              <div
                class="search flex md:hidden items-center bg-gray-900 h-20 rounded-md py-1 px-2 flex-none"
              >
                <div class="relative flex items-center w-full">
                  <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Buscar produtos"
                    :class="{ dark: isDarkMode }"
                    class="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
                    @keyup.enter="searchProducts"
                  />

                  <span
                    class="absolute bottom-0 w-full border-b-2 border-gray-400"
                  ></span>
                </div>

                <button
                  class="bg-black text-white py-1 px-2 rounded-md ml-2 text-sm"
                  :class="{ dark: isDarkMode }"
                  @click="searchProducts"
                >
                  Buscar
                </button>
              </div>
            </li>
          </ul>
        </div>
        <ThemeToggle class="hidden md:block" />
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { debounce } from "lodash";

import api from "../services/api";
import ThemeToggle from "./ThemeToggle.vue";
import CartComponent from "./CartComponent.vue";

export default {
  props: {
    isDarkMode: Boolean,
  },

  data() {
    return {
      isMobileMenuOpen: false,
      categories: [],
      cartCount: 0,
      searchTerm: "",
      searchedProducts: [],
      isMobile: window.innerWidth <= 768,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },

  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },

  mounted() {
    this.fetchCategories();
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },

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

    async searchProducts() {
      this.$emit("search-term-changed", this.searchTerm);
    },

    toggleTheme() {
      this.$emit("toggle-theme");

      document.body.classList.toggle("dark");

      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("header--dark");
        const links = header.querySelectorAll("a");
        links.forEach((link) => link.classList.toggle("header__link--dark"));
      }
    },
  },
  watch: {
    searchTerm: {
      immediate: true,
      handler: async function () {
        const delayedSearch = debounce(this.searchProducts, 1000);
        delayedSearch();
      },
    },
  },

  components: { ThemeToggle, RouterLink, CartComponent },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");

.container {
  max-width: 1200px;
}

.logo {
  color: #333;
}

.search input:focus {
  outline: none;
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
  max-width: 100%;
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
  color: #fff;
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

#mobile-menu-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 2rem;
  align-items: center;
}

#mobile-menu-items li {
  display: flex;
  justify-content: center;
  width: 100%;
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

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.menu {
  display: flex;
  align-items: center;
}

.menu li {
  margin-right: 1.5rem;
}

.menu li:last-child {
  margin-right: 0;
}

.menu a:hover {
  color: #666;
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  background-color: rgb(17 24 39 / 69%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.mobile-menu a {
  color: #fff;
  text-decoration: none;
  font-size: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.mobile-menu a:hover {
  color: #666;
}

.mobile-menu-icon {
  cursor: pointer;
  display: none;
}

@media screen and (max-width: 768px) {
  .menu {
    display: none;
  }

  .mobile-menu-icon {
    display: block;
  }

  .mobile-menu {
    display: none;
  }

  .mobile-menu-icon.open svg:nth-child(1) {
    transform: rotate(45deg);
    transform-origin: 50% 50%;
  }

  .mobile-menu-icon.open svg:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-icon.open svg:nth-child(3) {
    transform: rotate(-45deg);
    transform-origin: 50% 50%;
  }

  .search {
    flex: 1;
    max-width: 600px;
  }

  @media screen and (max-width: 640px) {
    .search {
      max-width: 300px;
      font-size: 0.8rem;
      padding: 0.5rem;
    }
  }

  .search {
    max-width: 400px;
  }

  .search input[type="text"] {
    font-size: 1rem;
    padding: 0.5rem;
    width: 100%;
  }

  .search button.search-button {
    display: none;
    background-color: transparent;
    border: none;
    margin-left: -2.5rem;
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 640px) {
    .search {
      max-width: none;
      width: 100%;
    }

    .search input[type="text"] {
      font-size: 0.875rem;
      padding: 0.25rem;
    }

    .search button.search-button {
      display: flex;
    }
  }
  @media (max-width: 768px) {
    .search {
      width: auto;
      margin-right: 10px;
      margin-left: 10px;
    }

    .search input {
      width: calc(100% - 40px);
      margin-right: 30px;
    }

    .search button {
      font-size: 0.8rem;
    }
  }
}
@media (prefers-color-scheme: light) {
  .header {
    background-color: rgb(17 24 39);
  }
  .header .logo,
  .header .search input,
  .header .menu a,
  .header .cart i {
    color: #fff;
  }
}
</style>
