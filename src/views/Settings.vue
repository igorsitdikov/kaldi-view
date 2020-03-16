<template>
  <div>

<!--    <h1>Settings</h1>-->
    <h1>Настройки</h1>
    <h3>Выберите период</h3>
    <div class="date-wrapper">

      <DateTimePicker
        id="picker-no-props"
        v-model="dateFrom"
        format="yyyy-LL-dd hh:mm"
        :auto-close="true"
        locale="ru"
      />
      <DateTimePicker
        id="picker-no-propss"
        v-model="dateTo"
        format="yyyy-LL-dd hh:mm"
        :auto-close="true"
        locale="ru"
      />
      <button @click="showDates">Принять</button>
    </div>
    <h3>Добавить слово</h3>
    <div class="keywords-wrapper">
      <div class="keywords-wrapper__add">
        <input v-model="newKeyWord" placeholder="Например, вооружение"/>
        <button class="keywords-wrapper__adder" @click="addWord">Добавить слово</button>
        <!--            <button @click="getKeyWords">Обновить</button>-->
      </div>
      <h3>Списки ключевых слов</h3>
      <div class="keywords-wrapper__lists">

        <ul class="keywords">
          <h3>Список всех ключевых слов</h3>
          <li v-for="(item,index) in keyWordsList" :key="item.id">
            <p>{{item.keyword}}</p>
            <div class="keywords-wrapper__buttons">
              <button @click="deleteKeyWord(index,item.id)">Удалить</button>
              <button @click="$store.state.keyWordsSelectedList
            .push( keyWordsList[index])"> ></button>
            </div>
          </li>
        </ul>

        <ul class="keywords">
          <h3>Список ключевых слов для отбора</h3>
          <li v-for="(item,index) in $store.state.keyWordsSelectedList" :key="item.id">
            <p>{{item.keyword}}</p>
            <div class="keywords-wrapper__buttons">
              <button @click="$store.state.keyWordsSelectedList.splice(index, 1)">Убрать</button>
            </div>
          </li>
        </ul>

      </div>
    </div>

  </div>
</template>

<script>
import DateTimePicker from '../components/DateTimePicker.vue';
import { RepositoryFactory } from '../repositories/RepositoryFactory';

const keywordsRepository = RepositoryFactory.get('keywords');

export default {
  name: 'Settings',
  components: {
    DateTimePicker,
  },
  data() {
    return {
      dateFrom: '2020-03-14 00:00:00',
      dateTo: '2020-03-14 15:30:00',
      newKeyWord: '',
      keyWordsList: [],
    };
  },
  mounted() {
    this.getKeyWords();
    console.log(`${new Date(this.dateFrom).toISOString()},${new Date(this.dateTo).toISOString()}`);
  },
  methods: {
    async getKeyWords() {
      const { data } = await keywordsRepository.get();
      this.keyWordsList = data;
    },
    async addWord() {
      // console.log(
      //     this.$api.keywords.post(this.keyWordsList.length, this.newKeyWord)
      // );
      // console.log(
      //   this.$api.keywords
      //       .postSelected([1574629200000, 1574802000000], keywrd)
      //     // .then(resp => {console.log(resp)} )
      // );
      if (this.newKeyWord !== '') {
        this.keyWordsList.push({
          id: this.keyWordsList.length,
          keyword: this.newKeyWord,
          db: false,
        });
      }
      if (window.confirm('Добавить в базу данных?')) {
        await keywordsRepository.post({ keyword: this.newKeyWord });
      }

      this.newKeyWord = '';
      // console.log("sad");
    },
    async deleteKeyWord(index, id) {
      this.keyWordsList.splice(index, 1);
      if (window.confirm('Удалить из базы данных?')) {
        await keywordsRepository.delete(id);
      }
    },
    showDates() {
      // console.log(`${new Date(this.dateFrom).getTime()},${new Date(this.dateTo).getTime()}`);
      this.$store.state.dateFromTo = `${new Date(this.dateFrom).getTime()},${new Date(this.dateTo).getTime()}`;
      this.$store.state.dateFromTo = `?from=${new Date(this.dateFrom).toISOString().replace('Z', '')}&to=${new Date(this.dateTo).toISOString().replace('Z', '')}`;
      console.log(this.$store.state.dateFromTo);
    },
  },
};
</script>

<style scoped>
  .date-wrapper {
    padding: 20px;
    background-color: #333333;
    display: flex;
    justify-content: space-around;
  }

  .keywords-wrapper__lists{
    background-color: #42b983;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .keywords-wrapper__lists .keywords {
    text-align: left;
    list-style: none;
    height: 600px !important;
    background-color: #42b983;
  }
  .keywords-wrapper__lists .keywords li{
    display: flex;
    justify-content: space-between;
  }
  .keywords-wrapper__lists .keywords li p{
    font-weight: bold;
    font-size: 16px;
    margin: 5px;
  }
  .keywords-wrapper__buttons {
    display: flex;
  }
  .keywords:first-child{
    border-right: #1a0303 5px solid;
  }
  .keywords-wrapper__add{
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
  }
  .keywords-wrapper__adder{
    padding: 10px;
  }
  h3{
    position: relative;
    text-align: center;
  }
  h3:before {
    content: '';
    position: absolute;
    height: 3px;
    width: 100px;
    background-color: #2c3e50;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
    margin: auto;
    top: 35px;
  }
  button{
    border: transparent 1px solid;
    background-color: #42b983;
    /*width: 120px;*/
    padding: 10px;
    color: #ffffff;
    transition: background-color 0.25s ease-out, color  0.25s ease-out, border 0.25s ease-out;
    cursor: pointer;
  }
  button:hover{
    background-color: #ffffff;
    color: #42b983;
    border: #42b983 1px solid;
  }
</style>
