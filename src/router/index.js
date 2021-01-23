import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/user/Login";
import Home from "../views/user/Home";
import HomeView from "../views/user/HomeView";
import Datasets from "../views/user/Datasets";
import Items from "../views/user/Items";
import Annotation from "../views/user/Annotation";
import SignUp from "../views/user/SignUp";

import AdminLogin from "../views/admin/Login";
import AdminMain from "../views/admin/Main";
import AdminHome from "../views/admin/Home";
import Users from "../views/admin/Users"

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
    component: SignUp,
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
    path: "/administrator",
    name: "admin-login",
    component: AdminLogin,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminMain,
    children: [
      {
        path: "home",
        name: "admin-home",
        component: AdminHome
      },
      {
        path: "users",
        name: "users",
        component: Users
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
