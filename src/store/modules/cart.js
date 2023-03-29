export default {
  namespaced: true,
  state: {
    // items: [{ id: 1, name: "teste" }],
    currentCart: JSON.parse(localStorage.getItem("cart")) || [],
    // localStorage.getItem("cart") ||
    // [
    // {
    //   id: 4,
    //   title: "Mens Casual Slim Fit",
    //   price: 15.99,
    //   description:
    //     "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    //   category: "men's clothing",
    //   image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    //   rating: {
    //     rate: 2.1,
    //     count: 430,
    //   },
    // },
    // ],
  },
  mutations: {
    // addToCart(state, product) {
    //   const item = state.items.find((item) => item.id === product.id);
    //   if (item) {
    //     item.quantity++;
    //   } else {
    //     state.items.push({
    //       id: product.id,
    //       name: product.name,
    //       price: product.price,
    //       quantity: 1,
    //     });
    //   }
    // },
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
      // const index = state.currentCart.findIndex(
      //   (item) => item.id === itemToRemove.id
      // );
      if (existingItem) {
        existingItem.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.currentCart));
    },

    addToCart(state, product) {
      const item = state.currentCart.find((item) => item.id === product.id);
      console.log(product);
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
      console.log(state.currentCart);
      console.log(product);
      console.log(item);
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
