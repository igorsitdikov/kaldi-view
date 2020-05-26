<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="subtitle-1">Удалить из базы данных?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Отмена</v-btn>
          <v-btn color="green darken-1" text @click="confirm">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list >
      <v-list-item-group  class="column_wrapper"
        v-model='activeWords'
        multiple
      >
        <template
          v-for="(item,index) in keywords"
        >
          <v-list-item
            :key="item.id"
            :value="item.keyword"
            active-class="green accent-2 text--accent-4"
            @click="saveSelected"
          >
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.keyword"></v-list-item-title>
              </v-list-item-content>
              <v-btn
                @click="deleteKeyWord(index,item.id)"
                class="mx-2"
                fab
                x-small
                dark
                color="red darken-3">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'KeywordsList',
  props: ['keywords', 'main', 'selected'],
  data() {
    return {
      activeWords: this.selected,
      dialog: false,
      id: 0,
      index: 0,
    };
  },
  watch: {
    selected() {
      this.activeWords = this.selected;
    },
  },
  methods: {
    deleteKeyWord(index, id) {
      this.id = id;
      this.dialog = true;
      this.index = index;
    },
    confirm() {
      this.$root.$emit('deleteKeyword', this.id);
      this.dialog = false;
      this.keywords.splice(this.index, 1);
    },
    saveSelected() {
      this.$nextTick(() => {
        this.$store.commit('setKeyWords', this.activeWords);
      });
    },
  },
};
</script>

<style scoped>
  .column_wrapper {
    max-height: 200px;
    display: flex;
    flex-flow: column wrap;
    column-count: 3;
  }
</style>
