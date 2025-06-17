import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Host from "../views/host.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/host", component: Host },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
