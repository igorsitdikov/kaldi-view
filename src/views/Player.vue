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
        <play-list :play-list="$store.state.playlist"
                   :items-per-page="itemsPerPage"
                   :page="page"
        ></play-list>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount-1" @input="getRecordsByPage">
          </v-pagination>
          <v-text-field
            :value="itemsPerPage"
            label="Items per page"
            type="number"
            min="-1"
            max="15"
            @input="updatePagination($event)"
          ></v-text-field>
        </div>
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
      page: 0,
      pageCount: 0,
      itemsPerPage: 5,
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
  watch: { },
  methods: {
    play(id) {
      this.$store.state.currentTrack = id;

      if (this.audioplayer !== undefined) {
        this.audioplayer.addTranscriptions();
        this.audioplayer.testPLayer();
      }
    },
    async updatePagination(event) {
      this.itemsPerPage = parseInt(event, 10);
      await this.getRecords();
    },
    async getRecordsByPage() {
      const keyWordsSelected = this.$store.state.keyWordsSelectedList;
      const { data } = await audiorecordsRepository.getByKeywordsPage(keyWordsSelected,
        `${this.$store.state.dateFromTo}`,
        this.page === 0 ? 0 : this.page - 1,
        this.itemsPerPage);
      this.files = data.records;
      this.pageCount = data.pages;
      this.$store.state.playlist = data.records;
      console.log(data.pages);
      console.log(data.records);
    },
    async getRecords() {
      this.files = [];
      this.$store.state.playlist = [];
      this.getRecordsByPage();
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
