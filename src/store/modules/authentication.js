// import axios from "../axios_setup";

const state = {
  isLoading: false,
};

const mutations = {
  isLoading(state, data) {
    state.isLoading = data;
  },
};

const actions = {};

const getters = {
  isLoading: (state) => state.isLoading,
};

export default { state, mutations, actions, getters };
