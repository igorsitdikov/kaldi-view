import Vue from 'vue';
import router from '../../router';

export const initialStateGlobalSettings = () => ({
  role: false,
  authorized: false,
  objectId: '',
  object: null,
  userId: '',
  isProject: false,
});

const data = {
  role: false,
  authorized: false,
  objectId: '',
  object: null,
  userId: '',
  isProject: false,
};

const getters = {};

const mutations = {
  setRole(state, admin) {
    Vue.set(state, 'role', admin);
  },
  setIsProject(state, project) {
    Vue.set(state, 'isProject', project);
  },
  setObjectId(state, id) {
    Vue.set(state, 'objectId', id);
  },
  setObject(state, object) {
    Vue.set(state, 'object', object);
  },
  setUserId(state, id) {
    Vue.set(state, 'userId', id);
  },
  setAuthorized(state, authorized) {
    Vue.set(state, 'authorized', authorized);
  },
  resetStateGlobalSettings(state) {
    const initial = initialStateGlobalSettings();
    Object.keys(initial).forEach((key) => { state[key] = initial[key]; });
  },
  logout(state) {
    Vue.set(state, 'role', false);
    Vue.set(state, 'authorized', false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('vuex');
  },
};

const actions = {
  async logout({ commit }) {
    commit('logout');
    commit('resetStateGlobalSettings');
    await router.push('login');
  },
};

export default {
  state: data,
  getters,
  mutations,
  actions,
};
