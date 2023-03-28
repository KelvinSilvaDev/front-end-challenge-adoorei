<template>
  <template v-if="isDarkMode">
    <div class="shadow-lg w-full overflow-hidden bg-gray-900 text-white">
      <router-link :to="{ name: 'Product', params: { productId: product.id } }">
        <img
          class="h-80 w-full object-cover cursor-pointer first-letter:object-cover hover:scale-110 ease-in duration-500"
          :src="product.image"
          :alt="product.title"
          @click="navigateToProduct(product.id)"
        />
      </router-link>
      <div class="px-4 py-4 relative h-[180px] w-[100%]">
        <router-link
          :to="{ name: 'Product', params: { productId: product.id } }"
        >
          <h2 class="font-bold text-base tracking-wide mb-2">
            {{ product.title }}
          </h2>
        </router-link>
        <div
          class="flex align-center justify-between content-center items-center absolute bottom-1 left-2 w-[95%]"
        >
          <div class="mt-3">
            <span class="font-bold">Preço: </span>
            <span class="font-bold text-xl text-green-600">{{
              formatPrice(product.price)
            }}</span>
          </div>
          <div class="mt-4">
            <button
              class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              @click="addToCart(product.id)"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="shadow-lg rounded-lg overflow-hidden bg-slate-100 text-black">
      <router-link :to="{ name: 'Product', params: { productId: product.id } }">
        <img
          class="h-80 w-full object-cover cursor-pointer first-letter:object-cover hover:scale-110 ease-in duration-500"
          :src="product.image"
          :alt="product.title"
          @click="navigateToProduct(product.id)"
        />
      </router-link>
      <div class="px-4 py-4 relative h-[180px] w-[100%]">
        <router-link
          :to="{ name: 'Product', params: { productId: product.id } }"
        >
          <h2 class="font-bold text-base tracking-wide mb-2">
            {{ product.title }}
          </h2>
        </router-link>
        <div
          class="flex align-center justify-between content-center items-center absolute bottom-1 left-2 w-[95%]"
        >
          <div class="mt-3">
            <span class="font-bold">Preço: </span>
            <span class="font-bold text-xl text-green-600">{{
              formatPrice(product.price)
            }}</span>
          </div>
          <div class="mt-4">
            <button
              class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              @click="addToCart(product.id)"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line no-undef
    // theme: light,
  },
  data() {
    return {
      isDark: this.theme === "dark",
    };
  },
  computed: {
    // cardClasses() {
    //   return {
    //     "bg-gray-900 text-white": this.isDark,
    //     "bg-gray-100 text-gray-800": !this.isDark,
    //     "shadow-lg": !this.isDark,
    //     "shadow-md": this.isDark,
    //     "rounded-lg": true,
    //     "overflow-hidden": true,
    //   };
    // },
    ...mapGetters("cart", ["cartItems", "cartTotal"]),
    getTheme: mapGetters("theme", ["currentTheme"]),
    isDarkMode() {
      return this.$store.getters["theme/currentTheme"] === "dark";
    },
  },
  methods: {
    // addToCart(productId) {
    // implement your addToCart logic here
    // },
    formatPrice(price) {
      return `R$${price.toFixed(2)}`;
    },
    navigateToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
    getCurrentTheme() {
      if (this.currentTheme === "dark") {
        this.cardClasses = "bg-gray-900 text-white";
      } else if (this.currentTheme === "light") {
        this.cardClasses = "bg-white text-black";
      }
    },
    // toggleTheme() {
    //   this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
    // },
  },
  watch: {
    // theme(newTheme) {
    //   this.isDark = newTheme === "dark";
    // },
    currentTheme() {
      this.getTheme();
    },
  },
};
</script>

<style scoped>
.cardClasses:hover .cursor-pointer {
  transform: scale(1.1);
  transition: all ease-in-out 0.5s;
}
</style>
