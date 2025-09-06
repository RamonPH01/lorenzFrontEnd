import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Host from "../views/host.vue";
import Event from "../views/event.vue";
import HostLogin from "../views/hostLogin.vue";
import Request from "../views/request.vue";
import Checkout from "../views/checkout.vue";
import HostRegister from "../views/hostRegister.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/host", name: "host", component: Host, meta: { requiresAuth: true }  },
  { path: "/event/:id", name: "event", component: Event },
  { path: "/request", name: "request", component: Request },
  { path: "/checkout", name: "checkout", component: Checkout },
  { path: "/hostRegister", name: "hostRegister", component: HostRegister},
  { path: "/hostLogin", name: "hostLogin", component: HostLogin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();

  if (!requiresAuth) {
    next();
    return;
  }

  // Warten, bis Auth-Status geladen ist
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe();

    if (user) {
      next();
    } else {
      next("/hostLogin"); // Redirect zum Login
    }
  });
});

export default router;
