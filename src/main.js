import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import router from "./router";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import api from "./store/axios_setup";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");

    if (token) {
      const userID = JSON.parse(localStorage.getItem("user")).id;
      const is_admin = JSON.parse(localStorage.getItem("user")).is_admin
        ? "admin"
        : "";
      config.headers.Authorization = "Bearer " + token;
      config.headers.is_admin = is_admin;
      config.headers.user_id = userID;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          // what to do;
          break;
        case 401:
          if (
            error.response.data.message ==
            "Invalid email or password, Please try again"
          ) {
            console.log("Invalid email or password!");
          } else {
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            alert("Session expired, please login!");
            router.push("/");
            return Promise.reject(error.response);
          }
      }
    }
  }
);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
