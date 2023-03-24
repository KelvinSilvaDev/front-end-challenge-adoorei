<template>
  <div class="relative">
    <img
      :src="bannerImageUrl"
      alt="banner image"
      class="w-full h-auto object-cover"
    />
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div
      class="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center text-white"
    >
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-lg mb-8">{{ subtitle }}</p>
      <a href="#product-list" class="inline-block">
        <button
          class="bg-white text-black font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-black hover:text-white shadow-lg"
        >
          <span>Comprar</span>
          <i class="fas fa-shopping-cart ml-2"></i>
        </button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      required: true,
    },
    bannerImageUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
img {
  height: 400px;
}
@media (min-width: 768px) {
  img {
    height: 600px;
  }
}
button {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: black;
  color: white;
}
button:hover i {
  color: white;
}
i {
  font-size: 1.2rem;
  vertical-align: middle;
  transition: color 0.3s ease;
}
a:focus {
  outline: none;
}
</style>
