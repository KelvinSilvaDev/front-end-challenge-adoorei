<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <img
      class="h-48 w-full object-cover hover:scale-110 ease-in duration-500"
      :src="product.image"
      :alt="product.title"
    />
    <div class="px-4 py-4 relative h-[150px] w-[100%]">
      <h2 class="text-gray-800 font-bold text-md mb-2">{{ product.title }}</h2>
      <!-- <p class="text-gray-600 text-sm">{{ product.description }}</p> -->
      <div
        class="flex align-center justify-between content-center items-center absolute bottom-1 left-2 w-[95%]"
      >
        <div class="mt-3">
          <span class="text-gray-700 font-bold">Price:</span>
          <span class="font-bold text-xl text-gray-800">{{
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

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart(productId) {
      // implement your addToCart logic here
    },
    formatPrice(price) {
      return `$${(price / 100).toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.product-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.product-category {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.add-to-cart {
  background-color: #000000;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.add-to-cart:hover {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
}
</style>
