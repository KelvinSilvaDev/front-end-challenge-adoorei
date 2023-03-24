import * as Vue from "vue";
import Vuex from "vuex";
import cartModule from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart: {
      namespaced: true,
      ...cartModule,
    },
  },
});
