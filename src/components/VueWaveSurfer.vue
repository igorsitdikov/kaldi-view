<template>
  <div></div>
</template>

<script>
import Vue from 'vue';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap';
import Region from 'wavesurfer.js/dist/plugin/wavesurfer.regions';

export default {
  props: ['options'], // , "regions" "src",
  data() {
    return {
      waveSurfer: {},
      // words: this.word
    };
  },
  methods: {
    unlightWord(items) {
      items.color = 'red';
    },
  },
  mounted() {
    const { options } = this;
    const { start } = this;
    const wsOptions = Object.assign(
      {
        container: this.$el,
        waveColor: '#428bca',
        progressColor: '#e20c0c',
        height: 120,
        barWidth: 1,
      },
      options,
    );
    this.waveSurfer = new WaveSurfer();
    this.waveSurfer.create(wsOptions);
  },
  beforeDestroy() {
    this.waveSurfer.destroy();
  },

};
</script>

<style lang="css" scoped>
div {
  position: relative;
}
</style>
