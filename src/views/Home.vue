<template>
  <Banner
    :banner-image-url="bannerImageUrl"
    :mobile-banner-image-url="mobileBannerImageUrl"
    title="Descubra a melhor seleção de produtos para você"
    subtitle="Na nossa loja virtual, oferecemos uma ampla seleção de produtos de qualidade superior, que atendem às suas necessidades e preferências. Navegue pela nossa variedade de produtos, encontre o que você precisa e receba na comodidade da sua casa. Não perca mais tempo e adquira agora mesmo os produtos que vão facilitar o seu dia a dia e torná-lo mais prático e agradável."
    button-label="Comprar"
    :class="theme"
    :theme="theme"
  />
  <ProductList :products="products" :class="theme" />
</template>
<!-- @add-to-cart="addToCart" -->
<script>
import ProductList from "../components/ProductList.vue";
import Banner from "../components/Banner.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
import api from "../services/api";

export default {
  name: "Home",

  components: {
    Banner,
    ProductList,
  },
  data() {
    return {
      products: [],
      bannerImageUrl:
        "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      mobileBannerImageUrl:
        "https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      localTheme: this.theme,
    };
  },
  mounted() {
    this.fetchProducts();

    this.getTheme();

    this.getMyTheme();
    document.title = "Home";
  },
  computed: {
    ...mapGetters("theme", ["currentTheme"]),
  },
  methods: {
    getMyTheme() {
      const newTheme = this.currentTheme;
      return newTheme;
    },

    async fetchProducts() {
      try {
        const response = await api.get("/products");
        this.products = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    ...mapActions([
      "cart",
      ["addToCart"],
      "theme",
      ["changeTheme", "getTheme"],
    ]),

    ...mapMutations("cart", ["incrementItemQuantity"]),
    getTheme() {
      return this.currentTheme;
    },
  },
  watch: {
    theme(newValue) {
      this.localTheme = newValue;
    },
    currentTheme() {
      this.getMyTheme();
    },
  },
};
</script>
