import axios from "../axios_setup";
const userID = JSON.parse(localStorage.getItem("user")).id;

const state = {
  assignedDatasets: {},
  assignedDataset: {},
  currentItem: {},
};

const mutations = {
  assignedDatasets: (state, payload) => {
    state.assignedDatasets = payload;
  },
  assignedDataset: (state, payload) => {
    state.assignedDataset = payload;
  },
  currentItem: (state, payload) => {
    state.currentItem = payload;
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
  getUserDataset: async function({ commit }, datasetID) {
    try {
      const res = await axios.get(`/user/datasets/${datasetID}/`);
      console.log("Response here", res);
      commit("assignedDataset", res.data);
    } catch (err) {
      console.log(err);
    }
  },
  getUserItem: async function({ commit }, itemID) {
    try {
      const res = await axios.get(`/user/item/${itemID}/`);
      console.log("Response", res);
      commit("currentItem", res.data);
    } catch (err) {
      console.log(err);
    }
  },
};

const getters = {
  assignedDatasets: (state) => state.assignedDatasets,
  assignedDataset: (state) => state.assignedDataset,
  currentItem: (state) => state.currentItem,
};

export default { state, mutations, actions, getters };
