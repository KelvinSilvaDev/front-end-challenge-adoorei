<template>
  <div class="flex flex-col h-full" :class="bgThemeChanger">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
        <div class="flex justify-center md:justify-end">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full max-w-md max-h-full object-fit md:w-3/4 md:h-fit rounded-lg shadow-lg"
          />
        </div>
        <div class="flex flex-col justify-between">
          <div class="mb-4">
            <h1
              class="text-2xl md:text-3xl font-bold text-gray mb-2"
              :class="productClassesText"
            >
              {{ product.title }}
            </h1>

            <router-link
              v-if="product.category"
              :to="{ name: 'Category', params: { category: product.category } }"
              class="text-sm md:text-base category-link"
              :class="productCategoryLink"
            >
              {{ product.category }}
            </router-link>
          </div>
          <div class="mb-4">
            <p
              class="text-lg md:text-xl description-text"
              :class="productClassesText"
            >
              {{ product.description }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-lg font-bold text-[#00bb31] md:text-xl">
              Preço: R$ {{ product.price }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-lg text-[#ff6500] md:text-xl">
              Avaliação: {{ product.rating ? product.rating.rate : "N/A" }}/5.0
              ({{ product.rating ? product.rating.count : "0" }} avaliações)
            </p>
          </div>
          <div class="mb-4">
            <button
              class="bg-green-600 text-white font-bold text-lg py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-gray-900"
              @click="addToCart"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
      <h3 class="text-2xl text-bold mb-2" :class="productClassesText">
        Produtos relacionados
      </h3>
      <RelatedProducts
        v-if="product.category"
        :category="product.category"
        :current="product.id"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import RelatedProducts from "../components/RelatedProducts.vue";
import api from "../services/api";

export default {
  name: "Product",
  data() {
    return {
      product: {},
      productClassesText: "text-black",
      productCategoryLink:
        "rounded-2xl p-1.5 text-stone-700 hover:text-stone-300 hover:underline hover:bg-zinc-600",
      bgThemeChanger: "",
    };
  },
  components: {
    RelatedProducts,
  },
  computed: {
    ...mapGetters("theme", ["currentTheme"]),
  },
  mounted() {
    this.fetchProduct();
    this.getCurrentTheme();
    this.updatePageTitle(this.productName);
  },
  created() {
    this.getCurrentTheme();
  },
  methods: {
    getCurrentTheme() {
      this.theme = localStorage.getItem("theme") || "light";
      localStorage.setItem("theme", this.theme);
      if (this.theme === "dark") {
        this.productClassesText = "text-white";
        this.productCategoryLink =
          "rounded-2xl p-1.5 text-stone-300 hover:text-stone-700 hover:underline hover:bg-zinc-100";
        this.bgThemeChanger = "bg-gray-800";
      } else if (this.theme === "light") {
        this.productClassesText = "text-black";
        this.productCategoryLink =
          "rounded-2xl p-1.5 text-stone-700 hover:text-stone-300 hover:underline hover:bg-zinc-600";
        this.bgThemeChanger = "bg-zinc-100";
      }
    },

    fetchProduct(productId) {
      api
        .get(`products/${productId || this.$route.params.productId}`)
        .then((response) => {
          console.log(response.data);
          this.product = response.data;
          this.productName = response.data.title;
          this.updatePageTitle(this.productName);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updatePageTitle() {
      const title = this.productName;
      document.title = title;
    },
    addToCart() {
      // Implement your add to cart logic here
    },
  },
  setup() {
    const route = useRoute();

    console.log(route?.params);
  },
  watch: {
    currentProduct() {
      console.log(this.productName);
    },
    currentTheme() {
      this.getCurrentTheme();
    },
    "$route.params.productId"(newProductId) {
      this.fetchProduct(newProductId);
      console.log(this.productName);
      this.updatePageTitle();
    },
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.applyTheme);
  },
};
</script>

<!-- <style scoped>
.text-gray {
  color: #333;
}

.text-green {
  color: #00bb31;
  font-weight: bold;
}

.text-valuation {
  color: #ff6500;
  font-weight: bold;
}

.description-text {
  color: #333;
}

.add-to-cart-bt {
  background-color: #00bb31;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: ease-in-out 0.3s;
}

.add-to-cart-bt:hover {
  background-color: #ff8800;
  color: #111827;
  font-weight: bold;
}

.category-link {
  color: #9d9d9d;
  font-weight: bold;
  text-transform: capitalize;
}

.category-link:hover {
  background-color: #9d9d9d;
  color: #fff;
  padding: 0.2rem;
  border-radius: 5rem;
}

.dark .text-green {
  color: #00da41;
}

.dark .text-gray {
  color: #ccc;
}

.dark .text-valuation {
  color: #ff8800;
}

.dark .description-text {
  color: #ccc;
}

.dark .add-to-cart-bt {
  background-color: #00bb31;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.dark .add-to-cart-bt:hover {
  background-color: #ff8800;
  color: #111827;
  font-weight: bold;
}
</style> -->
