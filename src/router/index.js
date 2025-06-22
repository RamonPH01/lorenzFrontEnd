import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Host from "../views/host.vue";
import Test from "../views/test.vue";
import Event from "../views/event.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/host", name: "host", component: Host },
  { path: "/test", name: "test", component: Test },
  { path: "/event/:id", name: "event", component: Event }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
