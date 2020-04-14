import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/commutestatus",
    name: "CommuteStatus",
    beforeEnter: authGuard,
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/CommuteStatus")
  },
  {
    path: "/settings",
    name: "Settings",
    beforeEnter: authGuard,
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
