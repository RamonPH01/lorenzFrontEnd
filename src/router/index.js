import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Host from "../views/host.vue";
import Test from "../views/test.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/host", component: Host },
  { path: "/test", component: Test },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
