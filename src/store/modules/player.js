import Vue from 'vue';

const data = {
  count: 0,
  stompClient: null,
  stompClientNotTranscr: null,
  currentTrack: 1,
  dateFromTo: '',
  dateFrom: null,
  dateTo: null,
  playlist: [],
  currentTrackNum: 0,
  currentTranscriptions: [],
  keyWordsSelectedList: [],
};

const getters = {
  count: state => state.count,
  stompClient: state => state.stompClient,
  currentTrack: state => state.currentTrack,
  stompClientNotTranscr: state => state.stompClientNotTranscr,
  dateFromTo: state => state.dateFromTo,
  dateFrom: state => state.dateFrom,
  dateTo: state => state.dateTo,
  playlist: state => state.playlist,
  currentTrackNum: state => state.currentTrackNum,
  currentTranscriptions: state => state.currentTranscriptions,
  keyWordsSelectedList: state => state.keyWordsSelectedList,
};

const mutations = {
  setCurrentTrack(state, id) {
    Vue.set(state, 'currentTrack', id);
  },
  setCurrentTrackNum(state, track) {
    Vue.set(state, 'currentTrackNum', state.playlist.map(e => e.id).indexOf(track));
  },
  setKeyWords(state, array) {
    Vue.set(state, 'keyWordsSelectedList', []);
    Vue.set(state, 'keyWordsSelectedList', array);
  },
  setCurrentTranscriptions(state) {
    Vue.set(state, 'currentTranscriptions', []);
    Vue.set(state, 'currentTranscriptions', state.playlist[state.currentTrackNum].transcription);
  },
  setPlaylist(state, array) {
    Vue.set(state, 'playlist', []);
    Vue.set(state, 'playlist', array);
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
};

const actions = {
};

export default {
  state: data,
  getters,
  mutations,
  actions,
};
