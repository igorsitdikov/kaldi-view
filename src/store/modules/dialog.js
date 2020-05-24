import Vue from 'vue';

const data = {
  dialogProjectOpen: false,
};

const getters = {};

const mutations = {
  setDialogProject(state, open) {
    Vue.set(state, 'dialogProjectOpen', open);
  },
  toggleProjectDialog(state) {
    state.dialogProjectOpen = !state.dialogProjectOpen;
  },

};

const actions = {
  toggleProjectDialog({ commit }) {
    commit('toggleProjectDialog');
  },
};

export default {
  state: data,
  getters,
  mutations,
  actions,
};
