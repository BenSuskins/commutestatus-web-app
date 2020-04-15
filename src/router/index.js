import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { auth: false },
    beforeEnter: authGuard
  },
  {
    path: "/commutestatus",
    name: "CommuteStatus",
    meta: { auth: true },
    beforeEnter: authGuard,
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/CommuteStatus")
  },
  {
    path: "/settings",
    name: "Settings",
    meta: { auth: true },
    beforeEnter: authGuard,
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    meta: { auth: false },
    beforeEnter: authGuard,
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
