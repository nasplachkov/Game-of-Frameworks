import Vue from "vue";
import Router from "vue-router";

import store from "./store/store";

const SignIn = () =>
  import(/* webpackChunkName: "singin" */ "./views/auth/SignIn.vue");
const SignUp = () =>
  import(/* webpackChunkName: "signup" */ "./views/auth/SignUp.vue");
const Movies = () =>
  import(/* webpackChunkName: "Movies" */ "./views/shared/Movies.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
      meta: {
        guest: true
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      meta: {
        guest: true
      }
    },
    {
      path: "/movies",
      name: "movies",
      component: Movies,
      meta: {
        requiresAuth: true
      }
    },
    { path: "*", redirect: "/movies" }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("uJCG58LFb9") == null) {
      next("/signin");
    } else {
      let user = JSON.parse(localStorage.getItem("uJCG58LFb9"));
      store.dispatch("setUser", user);
      next();
    }
  } else {
    next();
  }
});

export default router;
