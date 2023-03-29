<template>
  <div class="relative">
    <div @click="isCartOpen = !isCartOpen">
      <div class="flex align-middle gap-2">
        <div class="cart relative ml-4">
          <i
            class="fas fa-shopping-cart text-white text-xl md:text-white hover:text-red-500 dark:text-gray-100"
          ></i>
          <span
            class="cart-count absolute top-0 right-0 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
            >{{ currentCart.length }}</span
          >
        </div>
      </div>
    </div>
    <div
      v-if="isCartOpen"
      class="absolute top-0 right-0 mt-12 w-64 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div v-if="currentCart.length === 0" class="p-4">Carrinho vazio</div>
      <ul v-else class="divide-y divide-gray-200">
        <li v-for="product in currentCart" :key="product.id" class="px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-12 h-12 object-cover rounded"
              />
              <div class="ml-2">
                <div class="text-sm font-medium text-gray-900">
                  {{ product.title }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ product.price }}
                </div>
                <div
                  class="flex items-center justify-between w-full min-w-[150px]"
                >
                  <div class="text-sm text-gray-500 flex items-center">
                    <span class="mr-2">{{ product.quantity }} x</span>
                    <span class="font-bold">{{ product.name }}</span>
                  </div>
                  <div class="w-20 flex items-center gap-5">
                    <button
                      class="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-700 focus:outline-none"
                      @click="incrementQuantity(product.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                    <button
                      class="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-700 focus:outline-none"
                      @click="decrementQuantity(product.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M18 12H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              @click="removeFromCart(product)"
            >
              <span class="sr-only">Remove</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.293 4.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </li>
        <li class="px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="font-medium text-gray-900">Total:</div>
            <div class="font-medium">{{ totalPrice }}</div>
          </div>
        </li>
        <li class="px-4 py-3">
          <button
            class="w-full bg-gray-800 text-white py-2 px-4 rounded"
            @click="checkout"
          >
            Finalizar Pedido
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters("cartModule", ["currentCart", "cartTotal", "cartItems"]),
    ...mapState("cartModule", ["currentCart"]),
    totalPrice() {
      return this.formatPrice(
        this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      );
    },
  },
  data() {
    return {
      isCartOpen: false,
    };
  },
  watch: {
    currentCart: {
      handler() {
        this.totalPriceCalculator();
      },
    },
  },
  methods: {
    ...mapActions("cartModule", ["removeFromCart"]),
    ...mapMutations("cartModule", ["increaseItemQuantity"]),
    formatPrice(price) {
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });

      return formatter.format(price);
    },
    totalPriceCalculator() {},

    incrementQuantity(productId) {
      this.$store.commit("cartModule/increaseItemQuantity", productId);
    },
    decrementQuantity(productId) {
      this.$store.commit("cartModule/decreaseItemQuantity", productId);
    },

    removeFromCart(product) {
      this.$store.dispatch("cartModule/removeFromCart", product);
    },
    finalizarPedido() {},
  },
  mounted() {
    this.totalPriceCalculator();
  },
};
</script>
