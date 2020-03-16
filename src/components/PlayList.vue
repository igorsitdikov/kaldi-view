<template>
  <div>
    <ul class="playlist">
      <li v-for="(track, index) in playList" :key="index" @click="clicker(track)">
        <span>{{track.id}}</span>
        <span>{{track.datetime}}</span>
        <span>{{track.language}}</span>
        <span>{{track.source}}</span>
        <span>{{track.transcription.map(el => el.data.note).join(" ")}}</span>
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
  props: {
    playList: { type: Array },
    method: { type: Function },
  },
  mounted() {
    // this.playlist = this.$store.state.playlist;
  },
  methods: {
    clicker(track) {
      this.$root.$emit('clicker', track.id);
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
  .playlist {
    height: 630px;
    overflow-y: scroll;
    border-top: #42b983 5px solid;
    border-bottom: #42b983 5px solid;
    margin: 0;
    padding: 0;
    padding-top: 10px;
  }

  .playlist li {
    display: grid;
    border-bottom: 1px solid slateblue;
    border-top: 1px solid slateblue;
    padding: 10px;
    grid-template-columns: 50px 200px 50px 100px auto;
  }

  .playlist li span {
    border-right: 1px solid slateblue;
  }
</style>
