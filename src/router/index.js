import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue")
  },
  {
    path: "/commutestatus",
    name: "commutestatus",
    component: () =>
      import(
        /* webpackChunkName: "commutestatus" */ "../views/CommuteStatus.vue"
      )
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
