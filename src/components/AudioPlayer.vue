<template>
  <div class="player-wrapper">
<!--    <div>Плеер</div>-->
<!--    <div>Player</div>-->
    <div class="player-wrapper__player">
      <vue-wave-surfer :options="options" :file="track" ref="surf"></vue-wave-surfer>
    </div>
    <div class="player-wrapper__buttons">
      <v-btn class="play-pause"
              @click="play"
      >{{playPauseBtn ? 'Пауза' : 'Воспроизвести'}}</v-btn>
    </div>
  </div>
</template>

<script>
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap';
import Region from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import VueWaveSurfer from './VueWaveSurfer.vue';
import { RepositoryFactory } from '../repositories/RepositoryFactory';

const audiorecordsRepository = RepositoryFactory.get('audiorecords');

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
    // this.items.forEach(el => {
    //   this.player.addRegion(el);
    // });
    // console.log(test)
    // this.item = test.data.items;
    // this.totalRows = this.item.length;


    this.player.on('finish', () => {
    });


    this.player.on('region-in', (region) => {
      // console.log(region.id);
      this.$set(this.$store.state.currentTranscriptions[region.id], 'color', 'red');
      // .color = 'red';
      // console.log(this.$store.state.playlist[1]);
      // this.$set(this.selected.comment[region.id], 'color', 'rgba(189,24,255,0.59)');
    });
    this.player.on('region-out', (region) => {
      // this.$set(this.$store.state.playlist[this.$store.state.playlist
      //   .findIndex(x => x.id === this.$store.state.currentTrack)]
      //   .transcriptions[region.id],
      // 'color', 'rgba(1,62,255,0.59)');
      // region.color = 'rgba(1,62,255,0.59)';
      // this.$set(this.$store.state.playlist.
      // transcriptions[parseInt(region.id, 10)],
      // 'color', 'rgba(1,62,255,0.59)');
    });
    this.testPLayer();
  },
  computed: {
    player() {
      return this.$refs.surf.waveSurfer;
    },
    updates() {
      return this.$store.state.count;
    },
  },
  methods: {
    addTranscriptions() {
      this.player.clearRegions();
      if (this.$store.state.playlist.length !== 0) {
        this.$store.state.playlist[this.$store.state.currentTrackNum]
          .transcription.forEach((el) => {
            this.player.addRegion(el);
          });
      }
      console.log(this.$store.state.playlist[this.$store.state.currentTrackNum]);
    },
    play() {
      // console.log(this.player);
      this.playPauseBtn = !this.playPauseBtn;
      this.player.playPause();
    },
    async testPLayer() {
      const { data } = await audiorecordsRepository.getTrackById(this.$store.state.currentTrack);
      this.player.load(`data:audio/x-wav;base64,${data}`);

      this.player.on('ready', () => {
        this.player.play();
      });
    },
  },
};
</script>

<style scoped>
  /*.player-wrapper__player{*/
  /*  margin: 10px 0;*/
  /*  background-color: #dad7d7;*/
  /*}*/
  /*.player-wrapper__buttons .play-pause{*/
  /*  border: transparent 1px solid;*/
  /*  background-color: #42b983;*/
  /*  width: 120px;*/
  /*  padding: 10px;*/
  /*  color: #ffffff;*/
  /*  transition: background-color 0.25s ease-out, color  0.25s ease-out, border 0.25s ease-out;*/
  /*  cursor: pointer;*/
  /*}*/
  /*.player-wrapper__buttons .play-pause:hover{*/
  /*  background-color: #ffffff;*/
  /*  color: #42b983;*/
  /*  border: #42b983 1px solid;*/
  /*}*/
</style>
