<template>
  <div class="player-wrapper">
    <div>Player</div>
    <vue-wave-surfer :options="options" :file="track" ref="surf"></vue-wave-surfer>
    <button @click="play">Play</button>
  </div>
</template>

<script>
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap';
import Region from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import VueWaveSurfer from './VueWaveSurfer.vue';
import domain from '../config/config';

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
      hui: 0,
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

    this.player.clearRegions();
    this.player.on('region-in', (region) => {
      // this.$set(this.selected.comment[region.id], 'color', 'rgba(189,24,255,0.59)');
    });
    this.player.on('region-out', (region) => {
      // this.$set(this.selected.comment[region.id], 'color', 'rgba(1,62,255,0.59)');
    });
    this.player.load(`${domain}/api/track/${this.$store.state.currentTrack}`);

    this.player.on('ready', () => {
      this.player.play();
    });
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
    play() {
      // console.log(this.player);
      this.player.playPause();
    },
    testPLayer() {
      this.player.load(`${domain}/api/track/${this.$store.state.currentTrack}`);
      this.player.on('ready', () => {
        this.player.play();
      });
    },
    update() {
      // this.hui = 'asdsadas';
      // console.log(this.hui);
      console.log(this.$store.state.count);
      this.hui = this.updates;
    },
  },
};
</script>

<style scoped>

</style>
