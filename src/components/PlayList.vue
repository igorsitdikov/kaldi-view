<template>
  <div>
    <ul class="playlist">
      <li v-for="(track, index) in playList" :key="index" @click="clicker(track)">
        <span>{{track.id}}</span>
        <span>{{track.datetime}}</span>
        <span>{{track.language}}</span>
        <span>{{track.source}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PlayList',
  data: () => ({
    playlist: [],
  }),
  props: ['playList'],
  mounted() {
    // this.playlist = this.$store.state.playlist;
  },
  methods: {
    clicker(track) {
      this.$root.$emit('clicker', track);
    },
  },
  watch: {
    message: () => {
      this.clicker();
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
</style>
