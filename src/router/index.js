import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/user/Login";
import Home from "../views/user/Home";
import HomeView from "../views/user/HomeView";
import Datasets from "../views/user/Datasets";
import Items from "../views/user/Items";
import Annotation from "../views/user/Annotation";
import SignUp from "../views/user/SignUp";

import AdminLogin from "../views/admin/Login"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/user",
    name: "user",
    component: Home,
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "datasets",
        name: "user-datasets",
        component: Datasets,
      },
      {
        path: "datasets/:id",
        name: "data-item",
        component: Items,
      },
      {
        path: "datasets/:dataset/:id",
        name: "annotation",
        component: Annotation,
      },
    ],
  },

  {
      path: "/admin",
      name: "admin-login",
      component: AdminLogin,
      children: [
          
      ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
