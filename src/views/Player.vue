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
            <template v-for="(region, index) in $store.getters.currentTranscriptions">
              <v-chip :key="index"
                      :color="region.color"
                      class="ma-2"
                      x-small
                      label
                      text-color="black"
                      @click="regionPlay(region)"
              > {{region.data.note}}
              </v-chip>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <play-list :play-list="$store.getters.playlist"
                   :items-per-page="itemsPerPage"
                   :page="page"
        ></play-list>
        <div class="text-center pt-2">
          <v-pagination v-model="page"
                        total-visible="10"
                        :length="pageCount"
                        @input="getRecordsByPage"
          ></v-pagination>
          <v-text-field :value="itemsPerPage"
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

const audioRecordsRepository = RepositoryFactory.get('records');

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
      files: [],
      transcriptions: [],
    };
  },
  beforeDestroy() {
    this.$root.$off('clicker');
    this.$root.$off('playTrack');
  },
  mounted() {
    this.getRecordsByPage();
    this.$root.$on('clicker', (track) => {
      this.$store.commit('setCurrentTrackNum', track);
      this.$store.commit('setCurrentTranscriptions');
      this.play(track);
    });
    this.$root.$on('playTrack', id => this.play(id));
  },
  watch: {},
  methods: {
    regionPlay(region) {
      this.audioplayer.regionPlay(region.start);
    },
    async play(id) {
      this.$store.commit('setCurrentTrack', id);
      const { data } = await audioRecordsRepository.getTrackById(id);

      if (this.audioplayer !== undefined) {
        this.audioplayer.addTranscriptions();
        await this.audioplayer.loadPlay(data);
      }
    },
    async updatePagination(event) {
      this.itemsPerPage = parseInt(event, 10);
      await this.getRecordsByPage();
    },
    async getRecordsByPage() {
      this.files = [];
      const keyWordsSelected = this.$store.getters.keyWordsSelectedList;
      const { data } = await audioRecordsRepository.getByKeywordsPage(keyWordsSelected,
        `${this.$store.getters.dateFromTo}`,
        this.page === 0 ? 0 : this.page - 1,
        this.itemsPerPage);
      this.files = data.records;
      this.pageCount = data.pages;
      this.$store.commit('setPlaylist', this.files);
      if (this.files.length > 0) {
        await this.play(this.files[0].id);
      }
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
