import Vue from 'vue';
import Vuex from 'vuex';

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
  },
});
