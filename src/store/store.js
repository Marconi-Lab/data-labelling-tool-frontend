import Vue from "vue";
import Vuex from "vuex";
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  plugins: [
    createPersisteddState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
