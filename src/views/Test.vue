<template>
  <div>
    <h1>Test</h1>
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
  </div>
</template>

<script>
import DateTimePicker from '../components/DateTimePicker.vue';


export default {
  name: 'Test',
  components: {
    DateTimePicker,
  },
  data() {
    return {
      dateFrom: '2019-12-04 00:00:00',
      dateTo: '2019-11-27 00:00:00',
    };
  },
};
</script>

<style scoped>

</style>
