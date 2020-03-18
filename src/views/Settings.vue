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
      <button @click="saveConfig">Принять</button>
    </div>
    <h3>Добавить слово</h3>
    <div class="keywords-wrapper">
      <div class="keywords-wrapper__add">
        <input v-model="newKeyWord" placeholder="Например, вооружение"/>
        <button class="keywords-wrapper__adder" @click="addWord">Добавить слово</button>
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
    this.dateFrom = localStorage.getItem('dateFrom');
    this.dateTo = localStorage.getItem('dateTo');
    if (this.dateTo === null || this.dateFrom === null) {
      this.setDefaultDateTime();
    }
  },
  methods: {
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
      }
      this.$confirm('Добавить в базу данных?', '', 'question')
        .then(async function () {
          await keywordsRepository.post({ keyword: this.newKeyWord });
        }.bind(this)()).catch(() => {
          console.log('canceled');
        });
      this.newKeyWord = '';
    },
    deleteKeyWord(index, id) {
      const word = this.keyWordsList.splice(index, 1);
      this.$confirm(`Удалить запись ${word[0].keyword} из базы данных?`, '', 'question')
        .then(async () => {
          await keywordsRepository.delete(id);
        }).catch(() => {
          console.log('canceled');
        });
    },
    saveConfig() {
      this.dateFrom = new Date(this.dateFrom).toISOString()
        .replace('T', ' ')
        .substring(0, 19);
      this.dateTo = new Date(this.dateTo).toISOString()
        .replace('T', ' ')
        .substring(0, 19);
      this.$store.state.dateFromTo = `?from=${this.dateFrom}&to=${this.dateTo}`;

      localStorage.setItem('selectedKeywords', JSON.stringify(this.$store.state.keyWordsSelectedList));
      localStorage.setItem('dateFromTo', this.$store.state.dateFromTo);
      localStorage.setItem('dateFrom', this.dateFrom);
      localStorage.setItem('dateTo', this.dateTo);

      this.$alert('Настройки применены!', '', 'success')
        .then(() => {
          console.log('saved');
        });
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
  .swal2-styled.swal2-confirm {
    background-color: #42b983 ;
  }
</style>
