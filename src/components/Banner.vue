<template>
  <div class="relative h-screen md:h-auto">
    <template v-if="isDarkMode">
      <img
        :src="mobileBannerImageUrl"
        alt="banner image"
        class="w-full h-screen object-cover saturate-100 md:hidden"
        :class="wrapperClasses"
      />

      <!-- Nova imagem, exibida somente em telas médias e maiores -->
      <img
        :src="bannerImageUrl"
        alt="banner image"
        class="w-full h-auto object-cover saturate-200 hidden md:block"
        :class="wrapperClasses"
      />
    </template>
    <template v-else>
      <img
        :src="mobileBannerImageUrl"
        alt="banner image"
        class="w-full h-screen object-cover saturate-200 md:hidden"
        :class="wrapperClasses"
      />

      <!-- Nova imagem, exibida somente em telas médias e maiores -->
      <img
        :src="bannerImageUrl"
        alt="banner image"
        class="w-full h-auto object-cover saturate-200 hidden md:block"
        :class="wrapperClasses"
      />
    </template>

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
import { mapGetters } from "vuex";

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
    mobileBannerImageUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      wrapperClasses: "bg-white text-black brightness-100",
      isDarkMode: this.isDarkMode,
    };
  },
  computed: {
    ...mapGetters("theme", ["currentTheme"]),
  },
  methods: {
    getTheme() {
      if (this.currentTheme === "dark") {
        this.wrapperClasses = "bg-black text-white brightness-50";
        this.isDarkMode = true;
      } else if (this.currentTheme === "light") {
        this.isDarkMode = false;
        this.wrapperClasses = "bg-white text-black brightness-100";
      }
    },
  },
  watch: {
    currentTheme() {
      this.getTheme();
    },
  },

  mounted() {
    this.getTheme();
  },
};
</script>

<style scoped>
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
