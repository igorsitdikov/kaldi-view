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
    dateFrom: null,
    dateTo: null,
    playlist: [],
    currentTrackNum: 0,
    currentTranscriptions: [],
    keyWordsSelectedList: [],
  },
  getters: {
    keyWordsSelectedList: state => state.keyWordsSelectedList,
    dateFrom: state => state.dateFrom,
    dateTo: state => state.dateTo,
  },
  mutations: {
    setKeyWords(state, array) {
      Vue.set(state, 'keyWordsSelectedList', []);
      Vue.set(state, 'keyWordsSelectedList', array);
    },
    setDateFromTo(state, dates) {
      Vue.set(state, 'dateFromTo', dates);
    },
    setDateFrom(state, date) {
      Vue.set(state, 'dateFrom', date);
    },
    setDateTo(state, date) {
      Vue.set(state, 'dateTo', date);
    },
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
