// import axios from "../axios_setup";

const state = { imageGroup: [], imageBeingAnnotated: {} };

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
  imageBeingAnnotated: (state, payload) =>
    (state.imageBeingAnnotated = payload),
  imageAnnotated: (state, payload) => {
    state.imageGroup.map((x) => {
      if (x.id == payload.id) {
        x.bounding_box = payload.bounding_box;
      }
    });
  },
};

const actions = {};
const getters = {
  imageGroup: (state) => state.imageGroup,
  imageBeingAnnotated: (state) => state.imageBeingAnnotated,
};

export default { state, mutations, actions, getters };
