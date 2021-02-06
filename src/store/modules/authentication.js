import axios from "../axios_setup";

const state = {
  isLoading: false,
  authError: false,
  userHome: {},
};

const mutations = {
  isLoading(state, payload) {
    state.isLoading = payload;
  },
  authError(state, payload) {
    state.authError = payload;
  },
  userHome(state, payload) {
    state.userHome = payload;
  },
};

const actions = {
  userLogin: async function({ commit }, data) {
    try {
      let res = await axios.post("/auth/login/", data);
      console.log("login response", res);
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
  getuserHome: async function({ commit }) {
    try {
      const userID = JSON.parse(localStorage.getItem("user")).id;
      let res = await axios.get(`/user/${userID}/home/`);
      console.log("User stats", res);
      console.log("User home", res.data);
      commit("userHome", res.data);
    } catch (err) {
      console.log(err);
    }
  },
};

const getters = {
  isLoading: (state) => state.isLoading,
  authError: (state) => state.authError,
  userHome: (state) => state.userHome,
};

export default { state, mutations, actions, getters };
