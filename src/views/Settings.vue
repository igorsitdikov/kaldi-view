<template>
  <v-container fluid style="padding: 0 80px">
    <v-row>
      <v-col cols="12">
        <v-card :raised=true>
          <v-card-title><h1>Настройки</h1></v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <period :to="dateTo" :from="dateFrom"></period>
      </v-col>
      <v-col cols="12">
        <v-card :raised=true>
          <v-card-title><h3>Добавить слово</h3></v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-text>
                    <v-col cols="12">
                      <keyword-input></keyword-input>
                    </v-col>
                  </v-card-text>
                </v-card>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>Список всех ключевых слов</v-card-title>
                      <v-card-text>
                        <keywords-list
                          :keywords="keywords"
                          :selected="selected">
                        </keywords-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="subtitle-1">Добавить в базу данных?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Отмена</v-btn>
          <v-btn color="green darken-1" text @click="confirm">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { RepositoryFactory } from '../repositories/RepositoryFactory';
import Period from '../components/picker/Period.vue';
import KeywordsList from '../components/keywords/KeywordsList.vue';
import KeywordInput from '../components/keywords/KeywordInput.vue';

const keywordsRepository = RepositoryFactory.get('keywords');

export default {
  name: 'Settings',
  components: {
    Period,
    KeywordsList,
    KeywordInput,
  },
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      keyword: '',
      keywords: [],
      selected: [],
      dialog: false,
    };
  },
  mounted() {
    this.getKeyWords();
    this.showSelected();
    this.loadDateTime();
    this.$root.$on('deleteKeyword', this.deleteKeyword);
    this.$root.$on('addKeyword', this.addWord);
  },
  beforeDestroy() {
    this.$root.$off('deleteKeyword', this.deleteKeyword);
    this.$root.$off('addKeyword', this.addWord);
  },
  methods: {
    async deleteKeyword(id) {
      await keywordsRepository.delete(id);
    },
    showSelected() {
      this.selected = this.$store.state.keyWordsSelectedList;
    },
    loadDateTime() {
      this.dateFrom = this.$store.getters.dateFrom;
      this.dateTo = this.$store.getters.dateTo;
      if (this.dateTo === null || this.dateFrom === null) {
        this.setDefaultDateTime();
      }
    },
    setDefaultDateTime() {
      const dateTime = new Date();
      dateTime.setHours(dateTime.getHours() - 1);
      this.dateFrom = dateTime;
      this.dateTo = new Date();
      this.$store.commit('setDateFrom', this.dateFrom);
      this.$store.commit('setDateTo', this.dateTo);
    },
    async getKeyWords() {
      const { data } = await keywordsRepository.get();
      this.keywords = data;
    },
    addWord(keyword) {
      if (keyword !== '') {
        this.keywords.push({ keyword });
        this.keyword = keyword;
        this.dialog = true;
      }
    },
    async confirm() {
      await keywordsRepository.post({ keyword: this.keyword });
      this.dialog = false;
    },
  },
};
</script>

<style scoped>

</style>
