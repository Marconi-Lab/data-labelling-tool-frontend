import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import datasets from "./modules/datasets";
// import SecureLS from "secure-ls";

// const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    datasets,
  },
  plugins: [
    // createPersisteddState({
    //   storage: {
    //     getItem: (key) => ls.get(key),
    //     setItem: (key, value) => ls.set(key, value),
    //     removeItem: (key) => ls.remove(key),
    //   },
    // }),
  ],
});
