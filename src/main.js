import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import router from "./router";
import store from "./store/store";
import VeeValidate from "vee-validate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VeeValidate, {
  classes: true,
  validity: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid",
  },
});
new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
