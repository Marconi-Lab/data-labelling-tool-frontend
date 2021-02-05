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
      requires_auth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true,
      requires_auth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: {
      guest: true,
      requires_auth: false,
    },
  },
  {
    path: "/user",
    name: "user",
    component: Home,
    meta: {
      requires_auth: true,
      is_user: true,
    },
    children: [
      {
        path: "home",
        name: "user-home",
        component: HomeView,
        meta: {
          requires_auth: true,
          is_user: true,
        },
      },
      {
        path: "datasets",
        name: "user-datasets",
        component: Datasets,
        meta: {
          requires_auth: true,
          is_user: true,
        },
      },
      {
        path: "datasets/:id",
        name: "data-item",
        component: Items,
        meta: {
          requires_auth: true,
          is_user: true,
        },
      },
      {
        path: "datasets/:dataset/:id",
        name: "annotation",
        component: Annotation,
        meta: {
          requires_auth: true,
          is_user: true,
        },
      },
    ],
  },

  {
    path: "/administrator",
    name: "admin-login",
    component: AdminLogin,
    meta: {
      guest: true,
      requires_auth: false,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminMain,
    meta: {
      requires_auth: true,
      is_admin: true,
    },
    children: [
      {
        path: "home",
        name: "admin-home",
        component: AdminHome,
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "users",
        name: "users",
        component: Users,
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "datasets",
        name: "admin-datasets",
        component: AdminDatasets,
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "datasets/:id",
        name: "admin-particular-dataset",
        component: AdminItems,
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "datasets/:dataset/:id",
        name: "admin-annotation",
        component: AdminAnnotation,
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requires_auth)) {
    if (localStorage.getItem("jwt") === null) {
      alert("You are not logged in!");
      next({
        path: "/",
        continue: to.fullPath,
      });
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (
        to.matched.some((record) => record.meta.is_user) &&
        user.is_admin === ""
      ) {
        next();
      } else if (
        to.matched.some((record) => record.meta.is_admin) &&
        user.is_admin === "admin"
      ) {
        next();
      } else {
        next();
        return;
      }
    }
    next();
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("jwt") == null) {
      next({});
    } else {
      const role = JSON.parse(localStorage.getItem("user")).is_admin
        ? "admin"
        : "user";
      next({ name: `${role}-home` });
    }
  } else {
    next();
    return;
  }
});

export default router;
