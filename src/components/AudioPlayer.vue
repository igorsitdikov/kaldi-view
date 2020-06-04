<template>
  <v-card>
    <v-card-title>Плеер</v-card-title>
    <v-card-text>
      <div class="player-wrapper__player">
        <vue-wave-surfer :options="options"
                         :file="track"
                         ref="surf"
        ></vue-wave-surfer>
      </div>
      <div class="player-wrapper__buttons">
        <v-btn class="play-pause"
               fab
               dark
               small
               @click="play"
        >
          <v-icon dark>{{playPauseBtn ? 'mdi-pause' : 'mdi-play'}}</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap';
import Region from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import VueWaveSurfer from './VueWaveSurfer.vue';
import { RepositoryFactory } from '../repositories/RepositoryFactory';

const audioRecordsRepository = RepositoryFactory.get('records');

export default {
  name: 'AudioPlayer',
  components: {
    VueWaveSurfer,
  },
  data() {
    return {
      options: {
        plugins: [Cursor.create(), Minimap.create(), Region.create()],
      },
      track: 105,
      playPauseBtn: false,
    };
  },
  mounted() {
    this.player.on('finish', () => {
      this.playPauseBtn = false;
      console.log('finished');
    });

    this.player.on('region-in', (region) => {
      this.$set(this.$store.getters.currentTranscriptions[region.id], 'color', 'red');
    });
    this.player.on('region-out', (region) => {
      this.$set(this.$store.getters.currentTranscriptions[region.id], 'color', 'rgba(189,24,255,0.59)');
    });
    this.player.on('region-click', this.editAnnotation);
    this.testPLayer();
  },
  computed: {
    player() {
      return this.$refs.surf.waveSurfer;
    },
    updates() {
      return this.$store.state.player.count;
    },
  },
  methods: {
    editAnnotation(region) {
      console.log(region);
    },
    addTranscriptions() {
      this.player.clearRegions();
      if (this.$store.state.player.playlist.length !== 0) {
        this.$store.getters.playlist[this.$store.getters.currentTrackNum]
          .transcription.forEach((el) => {
            this.player.addRegion(el);
          });
      }
      console.log(this.$store.state.player.playlist[this.$store.state.player.currentTrackNum]);
    },
    play() {
      this.playPauseBtn = !this.playPauseBtn;
      this.player.playPause();
    },
    regionPlay(start) {
      this.player.play(start);
    },
    async testPLayer() {
      const { data } = await audioRecordsRepository
        .getTrackById(this.$store.state.player.currentTrack);
      this.player.load(`data:audio/x-wav;base64,${data}`);

      this.player.on('ready', () => {
        this.playPauseBtn = true;
        this.player.play();
      });
    },
  },
};
</script>

<style scoped>

</style>
