<template>
  <div class="related-products">
    <h3 class="text-lg font-medium mb-2">Produtos relacionados</h3>
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :loop="true"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
      :breakpoints="{ 275: { slidesPerView: 1 }, 900: { slidesPerView: 3 } }"
    >
      <swiper-slide v-for="product in relatedProducts" :key="product.id">
        <RelatedCard :product="product" />
      </swiper-slide>
    </swiper>
  </div>
  <Test />
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

import RelatedCard from "./RelatedCard.vue";

import { Pagination, Navigation } from "swiper";

import api from "../services/api";

import "swiper/css";

export default {
  name: "RelatedProducts",
  components: {
    RelatedCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      relatedProducts: [],
    };
  },
  created() {
    this.getRelatedProducts();
  },
  watch: {
    current: {
      handler() {
        this.getRelatedProducts();
      },
      immediate: true,
    },
  },
  methods: {
    async getRelatedProducts() {
      try {
        const { data } = await api.get(`/products/category/${this.category}`);
        this.relatedProducts = data.filter(
          (product) => product.id !== this.current
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.related-products {
  margin-top: 3rem;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 10;
}

.swiper-button-prev {
  left: 10px;
  background-image: url("/images/arrow-left.svg");
  background-position: center;
  background-repeat: no-repeat;
}

.swiper-button-next {
  right: 10px;
  background-image: url("/images/arrow-right.svg");
  background-position: center;
  background-repeat: no-repeat;
}
/* .swiper-button-custom {
  color: #000;
  font-size: 12px;
  font-weight: bold;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 8px;
  user-select: none;
} */

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}
</style>
