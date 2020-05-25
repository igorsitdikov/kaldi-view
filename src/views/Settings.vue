<template>
  <v-container>
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
                <div class="keywords-wrapper">
                  <v-card>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field v-model="newKeyWord" label="Например, вооружение">
                            <template v-slot:append-outer>
                              <v-menu
                                style="top: -12px"
                                offset-y
                              >
                                <template v-slot:activator="{ on }">
                                  <v-btn class="mx-2"
                                         fab
                                         dark
                                         color="light-blue darken-3"
                                         @click="addWord">
                                    <v-icon>mdi-plus</v-icon>
                                  </v-btn>
                                </template>
                              </v-menu>
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col cols="12">
                      <v-btn dark @click="saveSelected">
                        <v-icon>mdi-content-save</v-icon>
                        Сохранить список
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-card>
                        <v-card-title>Список всех ключевых слов</v-card-title>
                        <v-card-text>

                          <v-list>
                            <v-list-item-group
                              v-model='selected'
                              multiple
                            >
                              <template
                                v-for="(item,index) in keyWordsList"
                              >
                                <v-list-item
                                  :key="`item-${index}`"
                                  :value="item"
                                  active-class="green accent-2 text--accent-4"
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
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card>
                        <v-card-title>Список ключевых слов для отбора</v-card-title>
                        <v-card-text>

                          <v-list>
                            <v-list-item-group
                              v-model='selected'
                            >
                              <template
                                v-for="(item,index) in $store.state.keyWordsSelectedList"
                              >
                                <v-list-item
                                  :key="`item-${index}`"
                                  :value="item"
                                  active-class="green accent-2 text--accent-4"
                                >
                                  <template v-slot:default="{ active, toggle }">

                                    <v-list-item-content>
                                      <v-list-item-title v-text="item.keyword"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-btn
                                      @click="$store.state.keyWordsSelectedList.splice(index, 1)"
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
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RepositoryFactory } from '../repositories/RepositoryFactory';
import Period from '../components/picker/Period.vue';

const keywordsRepository = RepositoryFactory.get('keywords');

export default {
  name: 'Settings',
  components: {
    Period,
  },
  computed: {
    list() {
      return this.keyWordsList.map(el => el.keyword);
    },
  },
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      newKeyWord: '',
      keyWordsList: [],
      selected: [],
    };
  },
  mounted() {
    this.getKeyWords();
    this.showSelected();
    this.loadDateTime();
  },
  methods: {
    showSelected() {
      console.log(this.$store.state.keyWordsSelectedList);
      this.selected = this.$store.state.keyWordsSelectedList;
    },
    saveSelected() {
      console.log(this.selected);
      this.$store.commit('setKeyWords', this.selected);
      // this.$store.state.keyWordsSelectedList = this.selected;
    },
    loadDateTime() {
      this.dateFrom = localStorage.getItem('dateFrom');
      this.dateTo = localStorage.getItem('dateTo');
      if (this.dateTo === null || this.dateFrom === null) {
        this.setDefaultDateTime();
      }
    },
    setDefaultDateTime() {
      const dateTime = new Date();
      dateTime.setHours(dateTime.getHours() - 1);
      this.dateFrom = dateTime;
      this.dateTo = new Date();
    },
    async getKeyWords() {
      const { data } = await keywordsRepository.get();
      this.keyWordsList = data;
    },
    addWord() {
      if (this.newKeyWord !== '') {
        this.keyWordsList.push({ keyword: this.newKeyWord });
        this.$confirm('Добавить в базу данных?', '', 'question')
          .then(async function () {
            await keywordsRepository.post({ keyword: this.newKeyWord });
          }.bind(this)())
          .catch(() => {
            // console.log('canceled');
          });
        this.newKeyWord = '';
      }
    },
    deleteKeyWord(index, id) {
      const word = this.keyWordsList.splice(index, 1);
      this.$confirm(`Удалить запись ${word[0].keyword} из базы данных?`, '', 'question')
        .then(async () => {
          await keywordsRepository.delete(id);
        })
        .catch(() => {
          // console.log('canceled');
        });
    },
  },
};
</script>

<style scoped>

</style>
