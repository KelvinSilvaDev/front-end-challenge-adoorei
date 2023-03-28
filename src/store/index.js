import { createStore } from "vuex";

import cartModule from "./modules/cart";
import theme from "./modules/theme";

const store = createStore({
  mutations: {
    increment(state) {
      state.count++;
    },
    addToCart(state) {
      console.log("Add to cart", state);
    },
    removeFromCart(state) {
      console.log("Remove from cart", state);
    },
    changeTheme(state) {
      console.log("Change theme", state);
    },
  },
  modules: {
    cartModule,
    theme,
  },
  getters: {
    // Inclua aqui os getters que você deseja disponibilizar para seus componentes
    ...cartModule.getters,
    ...theme.getters,
  },
});

export default store;
