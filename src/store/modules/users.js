// import axios from "../axios_setup";

const state = { imageGroup: [] };

const mutations = {
  updateImageLabel: (state, payload) => {
    state.imageGroup.map((x) => {
      if (x.id == payload.id) {
        x.label = payload.label;
        x.labelled = true;
      }
    });
  },
  imageGroup: (state, payload) => (state.imageGroup = payload),
};

const actions = {};
const getters = {
  imageGroup: (state) => state.imageGroup,
};

export default { state, mutations, actions, getters };
