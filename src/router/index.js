import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Host from "../views/host.vue";
import Event from "../views/event.vue";
import HostLogin from "../views/host-login.vue";
import Request from "../views/request.vue";
import Checkout from "../views/checkout.vue";
import HostRegister from "../views/host-register.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/host", name: "host", component: Host },
  { path: "/host-login", name: "host-login", component: HostLogin },
  { path: "/event/:id", name: "event", component: Event },
  { path: "/request", name: "request", component: Request },
  { path: "/checkout", name: "checkout", component: Checkout },
  { path: "/host-register", name: "host-register", component: HostRegister},
  { path: "/host-login", name: "host-login", component: HostLogin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
