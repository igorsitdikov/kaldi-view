import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login';
import view from './modules/view';
import dialog from './modules/dialog';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    stompClient: null,
    stompClientNotTranscr: null,
    currentTrack: 1,
    dateFromTo: localStorage.getItem('dateFromTo'),
    playlist: [],
    currentTrackNum: 0,
    currentTranscriptions: [],
    keyWordsSelectedList: JSON.parse(localStorage.getItem('selectedKeywords')) !== null
      ? JSON.parse(localStorage.getItem('selectedKeywords')) : [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    view,
    dialog,
  },
  plugins: [createPersistedState()],
});
