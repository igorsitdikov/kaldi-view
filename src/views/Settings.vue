<template>
  <div>

    <h1>Settings</h1>

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
      <button @click="showDates">Dates</button>
    </div>


  </div>
</template>

<script>
import DateTimePicker from '../components/DateTimePicker.vue';

export default {
  name: 'Settings',
  components: {
    DateTimePicker,
  },
  data() {
    return {
      dateFrom: '2019-12-05 15:00:00',
      dateTo: '2019-12-05 15:30:00',
    };
  },
  methods: {
    showDates() {
      console.log(`${new Date(this.dateFrom).getTime()},${new Date(this.dateTo).getTime()}`);
      this.$store.state.dateFromTo = `${new Date(this.dateFrom).getTime()},${new Date(this.dateTo).getTime()}`;
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
</style>
