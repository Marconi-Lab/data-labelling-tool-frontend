import axios from "../axios_setup";

const state = {
  assignedDatasets: {},
  uploadMaxValue: 1,
  uploadValue: 0,
  isUploading: false,
  assignedDataset: {},
  currentItem: {},
  imageUpdating: null,
  allDatasets: [],
  annotating: false,
  boundingBox: { active: false, top: 0, left: 0, height: 0, width: 0 },
};

const mutations = {
  annotating: (state, payload) => {
    state.annotating = payload;
  },
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
  updateDatasets: (state, payload) => {
    // console.log(state, payload);
    state.allDatasets = payload;
  },
  allDatasets: (state, payload) => {
    state.allDatasets = payload;
  },
  modifyDatasets: (state, payload) => {
    state.allDatasets = state.allDatasets.filter((x) => x.id != payload);
  },
  boundingBox: (state, payload, flag) => {
    state.boundingBox.active = flag;
    state.boundingBox.left = payload.left;
    state.boundingBox.top = payload.top;
    state.boundingBox.width = payload.width;
    state.boundingBox.height = payload.height;
  },
  uploadMaxValue: (state, payload) => {
    state.uploadMaxValue = payload;
  },
  uploadValue: (state, payload) => {
    state.uploadValue = payload;
  },
  isUploading: (state, payload) => {
    state.isUploading = payload;
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
      commit("allDatasets", res.data, true);
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
  createDataset: async function({ commit }, data) {
    try {
      await axios.post(`/admin/datasets/`, data);
      const res = await axios.get(`/admin/datasets/`);
      commit("updateDatasets", res.data);
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
  getBoundingBox: async function({ commit }, imageID) {
    try {
      const res = await axios.get(`/user/images/${imageID}/`);
      if (res.boundingBox) {
        commit("boundingBox", JSON.parse(res.bounding_box));
      }
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
  annotating: (state) => state.annotating,
  boundingBox: (state) => state.boundingBox,
  uploadValue: (state) => state.uploadValue,
  uploadMaxValue: (state) => state.uploadMaxValue,
  isUploading: (state) => state.isUploading,
};

export default { state, mutations, actions, getters };
