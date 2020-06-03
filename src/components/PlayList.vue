<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="playList"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :page.sync="pageCurrent"
      :items-per-page="itemsPerPage"
      item-key="name"
      hide-default-footer
      show-expand
      @click:row="clicker"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Аудиозаписи</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <template v-for="(el, index) in item.transcription">
            <v-chip
              :key="index"
              :color="el.color"
              class="ma-2"
              x-small
              label
              @click="lights"
              text-color="black"
            >
              {{el.data.note}}
            </v-chip>
          </template>
          More info about {{ item.name }}
        </td>
      </template>
<!--      <template v-slot:top="{ pagination, options, updateOptions }">-->
<!--        <v-data-footer-->
<!--          :pagination="pagination"-->
<!--          :options="options"-->
<!--          @update:options="updateOptions"-->
<!--          items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>-->
<!--      </template>-->
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'PlayList',
  props: {
    playList: { type: Array },
    method: { type: Function },
    page: { type: Number },
    itemsPerPage: { type: Number },
  },
  data() {
    return {
      playlist: this.playList,
      pageCurrent: this.page,
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
    };
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
    playlist() {
      this.playlist = this.playList;
    },
    page() {
      this.pageCurrent = this.page;
    },
  },
};
</script>

<style scoped>
  .v-application .ma-2 {
    margin: 4px !important;
  }
</style>
