import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing";
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
import Users from "../views/admin/Users";
import AdminDatasets from "../views/admin/Datasets";
import AdminItems from "../views/admin/Items";
import AdminAnnotation from "../views/admin/Annotation";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Landing,
    meta: {
      guest: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: {
      guest: true,
    },
  },
  {
    path: "/user",
    name: "user",
    component: Home,
    meta: {
      requires_auth: true,
    },
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
        meta: {
          requires_auth: true,
        },
      },
      {
        path: "datasets",
        name: "user-datasets",
        component: Datasets,
        meta: {
          requires_auth: true,
        },
      },
      {
        path: "datasets/:id",
        name: "data-item",
        component: Items,
        meta: {
          requires_auth: true,
        },
      },
      {
        path: "datasets/:dataset/:id",
        name: "annotation",
        component: Annotation,
        meta: {
          requires_auth: true,
        },
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
    meta: {
      requires_auth: true,
    },
    children: [
      {
        path: "home",
        name: "admin-home",
        component: AdminHome,
        meta: {
          requires_auth: true,
        },
      },
      {
        path: "users",
        name: "users",
        component: Users,
        meta: {
          requires_auth: true,
        },
      },
      {
        path: "datasets",
        name: "admin-datasets",
        component: AdminDatasets,
        meta: {
          requires_auth: true,
        },
      },
      {
        path: "datasets/:id",
        name: "admin-particular-dataset",
        component: AdminItems,
        meta: {
          requires_auth: true,
        },
      },
      {
        path: "datasets/:dataset/:id",
        name: "admin-annotation",
        component: AdminAnnotation,
        meta: {
          requires_auth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
