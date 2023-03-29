import { createStore } from "vuex";

import cartModule from "./modules/cart";
import theme from "./modules/theme";

const store = createStore({
  mutations: {
    increment(state) {
      state.count++;
    },
    addToCart(state, product) {
      const item = state.currentCart.find((item) => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        state.currentCart.push({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.currentCart));
    },

    removeFromCart(state, product) {
      const index = state.currentCart.findIndex(
        (item) => item.id === product.id
      );
      if (index !== -1) {
        state.currentCart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state.currentCart));
    },

    clearCart(state) {
      state.currentCart.splice(0, state.currentCart.length);
      localStorage.setItem("cart", JSON.stringify(state.currentCart));
    },

    updateCart(state, product) {
      const item = state.currentCart.find((item) => item.id === product.id);
      if (item) {
        item.quantity = product.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.currentCart));
    },
  },
  modules: {
    cartModule,
    theme,
  },
  getters: {
    ...cartModule.getters,
    ...theme.getters,
  },
});

store.subscribe((mutation, state) => {
  if (mutation.type.startsWith("cartModule/")) {
    localStorage.setItem("cart", JSON.stringify(state.cartModule.currentCart));
  }
});

export default store;
