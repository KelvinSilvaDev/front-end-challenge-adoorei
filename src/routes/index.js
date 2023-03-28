import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/category/:category",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/product/:productId",
    name: "Product",
    component: () => import("../views/Product.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
