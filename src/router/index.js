import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "Landing" */ "../views/Landing.vue"),
    meta: {
      guest: true,
      requires_auth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/user/Login.vue"),
    meta: {
      guest: true,
      requires_auth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "SignUp" */ "../views/user/SignUp"),
    meta: {
      guest: true,
      requires_auth: false,
    },
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/user/Home.vue"),
    meta: {
      requires_auth: true,
      is_user: true,
    },
    children: [
      {
        path: "home",
        name: "user-home",
        component: () =>
          import(
            /* webpackChunkName: "HomeView" */ "../views/user/HomeView.vue"
          ),
        meta: {
          requires_auth: true,
          is_user: true,
        },
      },
      {
        path: "datasets",
        name: "user-datasets",
        component: () =>
          import(
            /* webpackChunkName: "Landing" */ "../views/user/Datasets.vue"
          ),
        meta: {
          requires_auth: true,
          is_user: true,
        },
      },
      {
        path: "datasets/:id",
        name: "data-item",
        component: () =>
          import(/* webpackChunkName: "Landing" */ "../views/user/Items.vue"),
        meta: {
          requires_auth: true,
          is_user: true,
        },
      },
      {
        path: "datasets/:dataset/:id",
        name: "annotation",
        component: () =>
          import(
            /* webpackChunkName: "Landing" */ "../views/user/Annotation.vue"
          ),
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
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/admin/Login.vue"),
    meta: {
      guest: true,
      requires_auth: false,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "AdminMain" */ "../views/admin/Main.vue"),
    meta: {
      requires_auth: true,
      is_admin: true,
    },
    children: [
      {
        path: "home",
        name: "admin-home",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Home.vue"),
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "users",
        name: "users",
        component: () =>
          import(/* webpackChunkName: "Users" */ "../views/admin/Users.vue"),
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "datasets",
        name: "admin-datasets",
        component: () =>
          import(
            /* webpackChunkName: "AdminDatasets" */ "../views/admin/Datasets.vue"
          ),
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "datasets/:id",
        name: "admin-dataset-items",
        component: () =>
          import(
            /* webpackChunkName: "AdminItems" */ "../views/admin/Items.vue"
          ),
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "datasets/:dataset/:id",
        name: "admin-annotation",
        component: () =>
          import(
            /* webpackChunkName: "AdminAnnotation" */ "../views/admin/Annotation.vue"
          ),
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "downloads",
        name: "admin-downloads",
        component: () =>
          import(
            /* webpackChunkName: "AdminDownloads" */ "../views/admin/Downloads.vue"
          ),
        meta: {
          requires_auth: true,
          is_admin: true,
        },
      },
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import(/* webpackChunkName: "AdminDashboard" */ "../views/admin/Dashboard.vue")
      }
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
