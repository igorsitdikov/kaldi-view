<template>
  <v-container class="page">
    <v-row>
      <v-col cols="12">
        <audio-player ref="aud"></audio-player>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Стенограмма</v-card-title>
          <v-card-text>
            <template v-for="(el, index) in $store.state.currentTranscriptions">
              <v-chip
                :key="index"
                :color="el.color"
                class="ma-2"
                x-small
                label
                text-color="black"
              >
                {{el.data.note}}
              </v-chip>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <play-list :play-list="$store.state.playlist"></play-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AudioPlayer from '../components/AudioPlayer.vue';
import PlayList from '../components/PlayList.vue';
import { RepositoryFactory } from '../repositories/RepositoryFactory';

const audiorecordsRepository = RepositoryFactory.get('audiorecords');

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
      this.$store.state.currentTrackNum = this.$store.state.playlist.map(e => e.id)
        .indexOf(track);
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
    async getRecords() {
      this.files = [];
      this.$store.state.playlist = [];
      const keyWordsSelected = this.$store.state.keyWordsSelectedList;
      const { data } = await audiorecordsRepository.getByKeywordsPage(keyWordsSelected, `${this.$store.state.dateFromTo}`, 0, 3);
      this.files = data.records;
      console.log(data.pages);
      console.log(data.records);
      this.$store.state.playlist = data.records;
    },
  },
};
</script>

<style scoped>
  .v-application .ma-2 {
    margin: 4px !important;
  }

  @media (max-width: 1024px) {
    .page {
      padding: 0 80px;
    }
  }
</style>
