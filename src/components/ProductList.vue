<template>
  <div class="max-w-7xl mx-auto py-8 px-4 md:px-8">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 relative product-card"
      >
        <div class="relative h-0 pb-56.25% product-image">
          <img
            :src="product.image"
            alt="Product image"
            class="absolute h-full w-full object-cover"
          />
          <div
            class="promo-label absolute top-0 right-0 bg-green-500 text-white rounded-bl-lg px-2 py-1 uppercase font-bold tracking-wide text-xs"
          >
            {{ product.promo }}
          </div>
        </div>
        <div class="p-4 relative min-h-[250px]">
          <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ product.category }}</p>
          <div
            class="absolute bottom-0 flex items-center justify-between mb-4 w-[93%]"
          >
            <div class="flex-column items-start">
              <span class="text-sm line-through text-gray-400 ml-2">{{
                formatPrice(product.price * 1.2)
              }}</span>
              <p class="text-green-500 font-bold text-md">
                {{ formatPrice(product.price) }}
              </p>
            </div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-full add-to-cart"
              @click="addToCart(product)"
            >
              <!-- <svg
                class="h-6 w-6 inline mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19H5V8H3V21H21V8H19V19ZM7 10H17V12H7V10ZM7 14H17V16H7V14Z"
                  fill="currentColor"
                />
              </svg> -->
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(["addToCart"]),
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
  },
};
</script>

<style>
.product-button {
  padding: 8px 12px;
  background-color: #4299e1;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 50px;
  transition: transform 0.2s, box-shadow 0.2s;
  position: absolute;
  bottom: 5px;
  right: 5px;
  left: 5px;
}

.product-button-sm {
  font-size: 14px;
}

.add-to-cart {
  max-width: 150px;
}

.product-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.product-card {
  position: relative;
}

.product-card:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.product-image-container {
  overflow: hidden;
  position: relative;
}

.product-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  transition: transform 0.2s ease-out;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-image:hover {
  transform: scale(1.05);
}

.promo-label {
  display: inline-block;
  background-color: #f6e05e;
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  margin-right: 0.5rem;
  text-transform: uppercase;
}

.product-button {
  transition: transform 0.2s ease-out;
}

.product-button:active {
  transform: scale(0.95);
}

.product-button {
  z-index: 1;
  transition: all 0.2s ease-in-out;
}

.product-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.line-through {
  text-decoration: line-through;
}
</style>
