import axios from "../axios_setup";
const userID = JSON.parse(localStorage.getItem("user")).id;

const state = {
  assignedDatasets: {},
};

const mutations = {
  assignedDatasets: (state, payload) => {
    state.assignedDatasets = payload;
  },
};

const actions = {
  getUserDatasets: async function({ commit }) {
    try {
      const res = await axios.get(`/user/${userID}/datasets/`);
      console.log(res);
      commit("assignedDatasets", res.data.datasets);
    } catch (err) {
      console.log(err);
    }
  },
};

const getters = {
  assignedDatasets: (state) => state.assignedDatasets,
};

export default { state, mutations, actions, getters };
