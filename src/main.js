import Vue from "vue";
import App from "./App.vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import Spinner from "vue-simple-spinner";
import * as rules from "vee-validate/dist/rules";
import router from "./router";
import store from "./store/store";
import api from "./store/axios_setup";

import {
  NavbarPlugin,
  NavPlugin,
  LayoutPlugin,
  ButtonPlugin,
  CardPlugin,
  IconsPlugin,
  BreadcrumbPlugin,
  ProgressPlugin,
  FormPlugin,
  FormSelectPlugin,
  FormTextareaPlugin,
  ModalPlugin,
  FormFilePlugin,
  FormInputPlugin,
  FormGroupPlugin,
  ListGroupPlugin,
  AlertPlugin,
} from "bootstrap-vue";

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

// install validator rules
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// install components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("Spinner", Spinner);

Vue.config.productionTip = false;
Vue.use(NavPlugin);
Vue.use(NavbarPlugin);
Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(CardPlugin);
Vue.use(IconsPlugin);
Vue.use(BreadcrumbPlugin);
Vue.use(ProgressPlugin);
Vue.use(FormPlugin);
Vue.use(ModalPlugin);
Vue.use(FormSelectPlugin);
Vue.use(FormTextareaPlugin);
Vue.use(FormFilePlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(ListGroupPlugin);
Vue.use(AlertPlugin);

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
