export default {
  namespaced: true,
  state: {
    currentCart: JSON.parse(localStorage.getItem("cart")) || [],
  },
  mutations: {
    addItemToCart(state, itemToAdd) {
      const existingItem = state.currentCart.find(
        (item) => item.id === itemToAdd.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.currentCart.push({ ...itemToAdd, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.currentCart));
    },
    removeItem(state, itemToRemove) {
      const existingItem = state.currentCart.find(
        (item) => item.id === itemToRemove.id
      );

      if (existingItem) {
        existingItem.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.currentCart));
    },

    addToCart(state, product) {
      const item = state.currentCart.find((item) => item.id === product.id);

      if (item) {
        item.quantity++;
      } else {
        state.currentCart.push({
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.currentCart));
    },

    increaseItemQuantity(state, itemId) {
      const item = state.currentCart.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(state.currentCart));
      }
    },

    decreaseItemQuantity(state, itemId) {
      const item = state.currentCart.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(state.currentCart));
      }
    },
    removeFromCart(state, product) {
      const existingItem = state.currentCart.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.currentCart = state.currentCart.filter(
            (item) => item.id !== product.id
          );
        }
        localStorage.setItem("cart", JSON.stringify(state.currentCart));
      }
    },

    clearCart(state) {
      state.currentCart = [];
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
  actions: {
    addToCart(context, product) {
      context.commit("addToCart", product);
    },
    updateCart(context, product) {
      context.commit("updateCart", product);
    },
    getCart() {
      const cart = JSON.parse(localStorage.getItem.parse("cart"));
      return cart;
    },
    removeFromCart({ commit }, product) {
      commit("removeFromCart", product);
    },
  },
  getters: {
    currentCart: (state) => state.currentCart,
    cartItems(state) {
      return state.currentCart;
    },

    cartTotal(state) {
      return state.currentCart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
};
