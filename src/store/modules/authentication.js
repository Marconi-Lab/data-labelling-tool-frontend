import axios from "../axios_setup";

const state = {
  isLoading: false,
  authError: false,
  userHome: {},
  registrationResponse: "",
  registrationError: "",
  adminHome: {},
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
  registrationResponse(state, payload) {
    state.registrationResponse = payload;
  },
  registrationError(state, payload) {
    state.registrationError = payload;
  },
  adminHome(state, payload) {
    state.adminHome = payload;
  },
};

const actions = {
  userLogin: async function({ commit }, data) {
    try {
      let res = await axios.post("/auth/login/", data);
      // console.log("login response", res);
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
  adminLogin: async function({ commit }, data) {
    try {
      let res = await axios.post("/auth/login/", data);
      const admin = res.data;
      if (admin.is_admin) {
        localStorage.setItem("jwt", admin.access_token);
        localStorage.setItem("user", JSON.stringify(admin));
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
      // console.log("User stats", res);
      // console.log("User home", res.data);
      commit("userHome", res.data);
    } catch (err) {
      console.log(err);
    }
  },
  getAdminHome: async function({ commit }) {
    try {
      const id = JSON.parse(localStorage.getItem("user")).id;
      let res = await axios.get(`/admin/${id}/home/`);
      commit("adminHome", res.data);
    } catch (err) {
      console.log(err);
    }
  },
  registerUser: async function({ commit }, data) {
    try {
      // console.log("Register data", data);
      const email = data.email;
      const password = data.password;
      const username = data.username;

      const res = await axios.post("/auth/register/", {
        email: email,
        password: password,
        username: username,
        is_admin: "",
      });
      commit("registrationResponse", res.data.message);
    } catch (err) {
      // console.log("Error .....", err);
      commit("registrationError", err.data.message);
    }
  },
};

const getters = {
  isLoading: (state) => state.isLoading,
  authError: (state) => state.authError,
  userHome: (state) => state.userHome,
  registrationResponse: (state) => state.registrationResponse,
  registrationError: (state) => state.registrationError,
  adminHome: (state) => state.adminHome,
};

export default { state, mutations, actions, getters };
