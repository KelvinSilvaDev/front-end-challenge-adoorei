<template>
  <div class="relative">
    <button
      class="bg-gray-800 text-white py-2 px-4 rounded"
      @click="isCartOpen = !isCartOpen"
    >
      Carrinho
    </button>

    <div
      v-if="isCartOpen"
      class="absolute top-0 right-0 mt-12 w-64 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div v-if="cartItems.length === 0" class="p-4">Carrinho vazio</div>
      <ul v-else class="divide-y divide-gray-200">
        <li v-for="(item, index) in cartItems" :key="item.id" class="px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-12 h-12 object-cover rounded"
              />
              <div class="ml-2">
                <div class="text-sm font-medium text-gray-900">
                  {{ item.title }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ item.quantity }} x {{ item.price }}
                </div>
              </div>
            </div>
            <button
              class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              @click="removeFromCart(index)"
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
export default {
  data() {
    return {
      carrinho: [],
      total: 0,
    };
  },
  methods: {
    atualizarQuantidade(index, quantidade) {
      if (quantidade <= 0) {
        this.carrinho.splice(index, 1);
      } else {
        this.carrinho[index].quantidade = quantidade;
      }
      this.calcularTotal();
    },
    excluirItem(index) {
      this.carrinho.splice(index, 1);
      this.calcularTotal();
    },
    calcularTotal() {
      this.total = this.carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
      );
    },
    checkout() {},
  },
  computed: {
    carrinhoVazio() {
      return this.carrinho.length === 0;
    },
  },
};
</script>
