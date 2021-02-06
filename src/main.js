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
    // const is_admin = localStorage.getItem("user");
    // console.log("is admin", is_admin);
    if (token) {
      config.headers.Authorization = "Bearer " + token;
      config.headers.is_admin = JSON.parse(
        localStorage.getItem("user")
      ).is_admin;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
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
