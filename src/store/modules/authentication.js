import axios from "../axios_setup";

const state = {
  isLoading: false,
  authError: false,
};

const mutations = {
  isLoading(state, payload) {
    state.isLoading = payload;
  },
  authError(state, payload) {
    state.authError = payload;
  },
};

const actions = {
  userLogin: async function({ commit }, data) {
    try {
      let res = await axios.post("/auth/login/", data);
      console.log("login response", res.data.is_admin);
      const user = res.data;
      if (!user.is_admin) {
        localStorage.setItem("jwt", user.access_token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        commit("authError", true);
        commit("isLoading", false);
      }
    } catch (err) {
      console.log("err", err);
      commit("authError", true);
      commit("isLoading", false);
    }
  },
};

const getters = {
  isLoading: (state) => state.isLoading,
  authError: (state) => state.authError,
};

export default { state, mutations, actions, getters };
