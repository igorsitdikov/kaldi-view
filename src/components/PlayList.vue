<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="records"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Playlist</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <template v-for="(el, index) in item.transcription" >
            <v-chip
              :key="index"
              :color="el.color"
              class="ma-2"
              x-small
              label
              @click="lights"
              text-color="white"
            >
              {{el.data.note}}
            </v-chip>
          </template>
          More info about {{ item.name }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'PlayList',
  data: () => ({
    playlist: [],
    singleExpand: false,
    expanded: [],
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {
        text: 'Дата время',
        value: 'datetime',
      },
      {
        text: 'Язык',
        value: 'language',
      },
      {
        text: 'Источник',
        value: 'source',
      },
      {
        text: '',
        value: 'data-table-expand',
      },
    ],
    records: [
      {
        id: 1,
        datetime: new Date().toISOString(),
        language: 'RU',
        source: 'Source',
        transcription: [
          {
            data: { note: 'test' },
            start: 0,
            end: 1,
            color: 'grey',
          },
          {
            data: { note: 'word' },
            start: 0,
            end: 1,
            color: 'grey',
          },
          {
            data: { note: 'feature' },
            start: 0,
            end: 1,
            color: 'red',
          },
          {
            data: { note: 'dog' },
            start: 0,
            end: 1,
            color: 'grey',
          },
        ],
      },
    ],
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
    lights() {
      alert('Toggling lights...');
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
  .v-application .ma-2 {
    margin: 4px !important;
  }
</style>
