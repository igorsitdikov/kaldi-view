<template>
  <div>
    <audio-player ref="aud"></audio-player>
    <div class="transcription">
      <span v-for="(item,index) in $store.state.currentTranscriptions"
            :style="{color: item.color}"
            :key="index">{{item.data.note}} </span>
    </div>
    <play-list :play-list="$store.state.playlist"></play-list>
    <!--    <button @click="play(1)">Player test</button>-->
    <!--    <button @click="getRecords()"></button>-->
  </div>
</template>

<script>
import AudioPlayer from '../components/AudioPlayer.vue';
import PlayList from '../components/PlayList.vue';

export default {
  name: 'Player',
  components: {
    PlayList,
    AudioPlayer,
  },
  computed: {
    audioplayer() {
      return this.$refs.aud;
    },
  },
  data() {
    return {
      file: '',
      files: [75, 88, 92],
      transcriptions: [],
    };
  },
  beforeDestroy() {
    this.$root.$off('clicker');
  },
  mounted() {
    this.getRecords();
    this.$root.$on('clicker', (track) => {
      // console.log(track);
      this.$store.state.currentTrackNum = this.$store.state.playlist.map(e => e.id).indexOf(track);
      // console.log('this');
      this.$store.state.currentTranscriptions = [];
      this.$store.state.currentTranscriptions = this.$store.state
        .playlist[this.$store.state.currentTrackNum].transcription;
      // this.$store.state.currentTranscriptions = this.transcriptions;
      // console.log(this.$store.state.currentTrackNum);

      this.play(track);
    });
    // this.play(track.id);
    // this.files = this.$store.state.playlist;
  },
  methods: {
    play(id) {
      this.$store.state.currentTrack = id;

      if (this.audioplayer !== undefined) {
        this.audioplayer.addTranscriptions();
        this.audioplayer.testPLayer();
      }
    },
    getRecords() {
      this.files = [];
      this.$store.state.playlist = [];
      const keyWrds = this.$store.state.keyWordsSelectedList;
      console.log(keyWrds);
      this.$api.records.post(keyWrds, `${this.$store.state.dateFromTo}`)
        .then((response) => {
          response.data.forEach((el) => {
            this.files.push(el);
            this.$store.state.playlist.push(el);
          });
        });
      // if (keyWrds.length === 0) {
      //   this.$api.records.get(`${this.$store.state.dateFromTo},true`).then((response) => {
      //     response.data.forEach((el) => {
      //       this.files.push(el);
      //       this.$store.state.playlist.push(el);
      //     });
      //   });
      // } else {
      //   this.$api.keywords.postSelected(
      //     this.$store.state.dateFromTo.split(','),
      //     keyWrds,
      //   ).then((response) => {
      //     response.data.forEach((el) => {
      //       this.files.push(el);
      //       this.$store.state.playlist.push(el);
      //     });
      //   });
      // }
    },
  },
};
</script>

<style scoped>
  .transcription {
    height: 80px;
    overflow-y: scroll;
    text-align: left;
    background-color: #dad7d7;
    padding: 10px;
    border-top: #42b983 4px solid;
    margin-top: 10px;
  }
</style>
