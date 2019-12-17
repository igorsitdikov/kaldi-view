<template>
  <div>
    <audio-player ref="aud"></audio-player>
    <div class="transcription">
      <span v-for="(item,index) in transcriptions" :key="index">{{item.data.note}} </span>
    </div>
    <ul class="playlist">
      <li v-for="(track,index) in files" :key="track.id" @click="play(track.id), transcript(index)">
<!--        <p>-->
          <span>{{track.id}}</span>
          <span>{{track.datetime}}</span>
          <span>{{track.language}}</span>
          <span>{{track.source}}</span>
<!--          <span>{{track.transcriptions}}</span>-->
<!--        </p>-->
       </li>
    </ul>
    <button @click="play(1)">Player test</button>
    <button @click="getRecords()"></button>
  </div>
</template>

<script>
import AudioPlayer from '../components/AudioPlayer.vue';

export default {
  name: 'Player',
  components: {
    AudioPlayer,
  },
  computed: {
    audioplayer() {
      return this.$refs.aud.testPLayer;
    },
  },
  data() {
    return {
      file: '',
      files: [75, 88, 92],
      transcriptions: [],
    };
  },
  mounted() {
    this.getRecords();
  },
  methods: {
    transcript(index) {
      console.log(index);
      this.transcriptions = this.files[index].transcriptions;
    },
    play(id) {
      this.$store.state.currentTrack = id;
      this.audioplayer();
    },
    getRecords() {
      this.files = [];
      this.$api.records.get(`${this.$store.state.dateFromTo},true`).then((response) => {
        response.data.forEach(el => this.files.push(el));
      });
    },
  },
};
</script>

<style scoped>
  .playlist{
    height: 200px;
    overflow-y: scroll;
  }
  .playlist li {
    display: grid;
    border-bottom: 1px solid slateblue;
    padding: 10px;
    grid-template-columns: 50px 200px 50px 100px auto;
  }
  .playlist li span {
    border-right: 1px solid slateblue;
  }
  .transcription{
    height: 150px;
    overflow-y: scroll;
  }
</style>
