import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    stompClient: null,
    stompClientNotTranscr: null,
    currentTrack: 1,
    dateFromTo: '',
    playlist: [],
    currentTrackNum: 0,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
