<template>
  <div>
    <audio-player ref="aud"></audio-player>
    <ul>
      <li v-for="track in files" :key="track" @click="play(track)">{{track}}</li>
    </ul>
    <button @click="play">Player test</button>
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
    };
  },
  methods: {
    play(id) {
      this.$store.state.currentTrack = id;
      this.audioplayer();
    },
  },
};
</script>

<style scoped>

</style>
