import axios from "../axios_setup";

const state = {
  assignedDatasets: {},
  assignedDataset: {},
  currentItem: {},
  imageUpdating: null,
  allDatasets: {},
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
  imageUpdating: (state, payload) => {
    state.imageUpdating = payload;
  },
  editCurrentItem: (state, payload) => {
    state.currentItem.comment = payload.comment;
    state.currentItem.label = payload.label;
    state.currentItem.labeller = payload.labeller;
  },
  allDatasets: (state, payload) => {
    state.allDatasets = payload;
  },
  modifyDatasets: (state, payload) => {
    state.allDatasets = state.allDatasets.filter((x) => x.id != payload);
  },
};

const actions = {
  getUserDatasets: async function({ commit }) {
    try {
      const userID = JSON.parse(localStorage.getItem("user")).id;
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
      // console.log("Response here", res);
      commit("assignedDataset", res.data);
    } catch (err) {
      console.log(err);
    }
  },
  getAllDatasets: async function({ commit }) {
    try {
      const res = await axios.get(`/admin/datasets/`);
      commit("allDatasets", res.data);
    } catch (err) {
      console.log(err);
    }
  },
  deleteDataset: async function({ commit }, datasetID) {
    try {
      const res = await axios.delete(`/admin/datasets/${datasetID}/`);
      console.log(res);
      commit("modifyDatasets", datasetID);
    } catch (err) {
      console.log(err);
    }
  },
  getUserItem: async function({ commit }, itemID) {
    try {
      const res = await axios.get(`/user/item/${itemID}/`);
      // console.log("Response", res);
      commit("currentItem", res.data);
    } catch (err) {
      console.log(err);
    }
  },
  labelImage: async function({ commit }, data) {
    try {
      // console.log("Data", data);
      const res = await axios.put(`/user/images/${data.imageID}/`, {
        labeller: data.labeller,
        label: data.label,
      });
      console.log(res);
      commit("imageUpdating", data.imageID);
    } catch (err) {
      console.log(err);
    }
  },
  labelFolder: async function({ commit }, data) {
    try {
      const res = await axios.put(`/user/item/${data.itemID}/`, {
        label: data.label,
        comment: data.comment,
        labeller: data.labeller,
      });
      console.log(res);
      commit("editCurrentItem", {
        labeller: data.labeller,
        comment: res.data.comment,
        label: res.data.label,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

const getters = {
  assignedDatasets: (state) => state.assignedDatasets,
  assignedDataset: (state) => state.assignedDataset,
  currentItem: (state) => state.currentItem,
  imageUpdating: (state) => state.imageUpdating,
  allDatasets: (state) => state.allDatasets,
};

export default { state, mutations, actions, getters };
