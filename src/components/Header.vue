<template>
  <div class="header-container sticky top-0 z-50" :class="{ dark: isDarkMode }">
    <div class="header dark:bg-gray-900" :class="{ dark: isDarkMode }">
      <div class="container mx-auto flex justify-between items-center py-4">
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
          class="search hidden md:flex items-center bg-transparent rounded-md py-1 px-2 flex-none"
        >
          <div class="relative flex items-center w-full">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="Buscar produtos"
              @keyup.enter="searchProducts"
              class="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
              :class="{ dark: isDarkMode }"
            />

            <span
              class="absolute bottom-0 w-full border-b-2 border-gray-400"
            ></span>
          </div>

          <button
            @click="searchProducts"
            class="bg-black text-white py-1 px-2 rounded-md ml-2 text-sm"
            :class="{ dark: isDarkMode }"
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
                class="text-red-400 hover:text-blue-500 capitalize"
                :class="{ dark: isDarkMode }"
              >
                {{ category }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="flex align-middle gap-2">
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

        <!-- Mobile Menu -->
        <div
          class="mobile-menu md:hidden"
          :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
        >
          <ul class="flex-col gap-2 items-center">
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="mr-2 mb-1 mt-1 w-[100%]"
            >
              <router-link
                :to="{ name: 'Category', params: { category: category } }"
                exact-active-class="text-blue-500"
                class="text-gray-800 hover:text-blue-500 capitalize flex w-[100%]"
                :class="{ dark: isDarkMode }"
              >
                {{ category }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
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
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  mounted() {
    this.fetchCategories();
    // this.fetchPascalCaseCategories();
    this.fetchCartCount();
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768; // update value based on screen width
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
  /* height: 40px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #f5f5f5;
  box-shadow: none; */
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

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

/* Logo */
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

/* Desktop Menu */
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

/* .menu a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
} */

.menu a:hover {
  color: #666;
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

/* .mobile-menu li {
  margin-bottom: 1rem;
} */

.mobile-menu a {
  color: #333;
  text-decoration: none;
  font-size: 1.1rem;
}

.mobile-menu a:hover {
  color: #666;
}

/* Mobile Menu Icon */
.mobile-menu-icon {
  cursor: pointer;
  display: none;
}

/* Media Queries */
@media screen and (max-width: 768px) {
  /* Header */
  .header {
    padding: 1rem;
  }

  /* Desktop Menu */
  .menu {
    display: none;
  }

  /* Mobile Menu Icon */
  .mobile-menu-icon {
    display: block;
  }

  /* Mobile Menu */
  .mobile-menu {
    display: none;
  }

  /* Mobile Menu Icon Animation */
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
</style>
