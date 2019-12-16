<template>
  <div class="about">
    <h1>This is an about page</h1>
    <vue-wave-surfer :options="options" ref="surf"></vue-wave-surfer>
    <button @click="play">Play</button>

    <p>{{this.$store.state.count}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap';
import Region from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import VueWaveSurfer from '../components/VueWaveSurfer.vue';
import domain from '../config/config';

export default {
  name: 'home',
  components: {
    VueWaveSurfer,
  },
  data() {
    return {
      options: {
        plugins: [Cursor.create(), Minimap.create(), Region.create()],

      },
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
    this.player.load(`${domain}/api/track/2`);

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
    update() {
      // this.hui = 'asdsadas';
      // console.log(this.hui);
      console.log(this.$store.state.count);
      this.hui = this.updates;
    },
  },
};
</script>
