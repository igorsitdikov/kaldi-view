const data = {
  projectSidebarOpen: false,
};

const getters = {
  projectSidebarOpen: state => state.projectSidebarOpen,
};

const mutations = {
  toggleProjectSidebar(state) {
    state.projectSidebarOpen = !state.projectSidebarOpen;
  },
};

const actions = {
  toggleProjectSidebar({ commit }) {
    commit('toggleProjectSidebar');
  },
  getProjectSidebarState({ state }) {
    return state.projectSidebarOpen;
  },
};

export default {
  state: data,
  getters,
  mutations,
  actions,
};
