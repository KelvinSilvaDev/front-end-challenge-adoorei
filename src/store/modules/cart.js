export default {
  namespaced: true,
  state: {
    items: [{ id: 1, name: "teste" }],
  },
  mutations: {
    addToCart(state, product) {
      const item = state.items.find((item) => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
    },
  },
  actions: {
    addToCart(context, product) {
      context.commit("addToCart", product);
    },
  },
  getters: {
    cartItems(state) {
      return state.items;
    },
    cartTotal(state) {
      return state.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
};
