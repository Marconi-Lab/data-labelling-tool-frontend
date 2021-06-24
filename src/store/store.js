import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import datasets from "./modules/datasets";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    datasets,
    users,
  },
  plugins: [],
});
