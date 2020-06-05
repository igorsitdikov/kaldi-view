<template>
  <v-card :raised=true class="teal darken-4">
    <v-card-title>Выберите период</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <datetime-picker label="С" v-model="dateFrom"></datetime-picker>
        </v-col>
        <v-col cols="6">
          <datetime-picker label="По" v-model="dateTo"></datetime-picker>
        </v-col>
      </v-row>
      <v-btn dark @click="saveConfig">
        <v-icon>mdi-content-save</v-icon>
        Принять</v-btn>
    </v-card-text>
    <v-snackbar
      v-model="snackbar"
      :timeout="1000"
    >
      Настройки применены!
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Скрыть
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import DatetimePicker from './DatetimePicker.vue';

export default {
  name: 'Period',
  components: {
    DatetimePicker,
  },
  props: ['from', 'to'],
  data() {
    return {
      dateFrom: this.from,
      dateTo: this.to,
      snackbar: false,
      dates: '',
    };
  },
  watch: {
    from() {
      this.dateFrom = this.from;
    },
    to() {
      this.dateTo = this.to;
    },
  },
  methods: {
    prepareDateTime(source) {
      return source.toString().length > 17 ? new Date(source.getTime() + (3 * 60 * 60 * 1000))
        .toISOString()
        .replace('T', ' ')
        .substring(0, 16) : source;
    },
    saveConfig() {
      this.dateFrom = this.prepareDateTime(this.dateFrom);
      this.dateTo = this.prepareDateTime(this.dateTo);
      this.dates = `?from=${this.prepareDateTime(this.dateFrom)}&to=${this.prepareDateTime(this.dateTo)}`;
      this.$store.commit('setDateFromTo', this.dates);
      this.$store.commit('setDateFrom', this.dateFrom);
      this.$store.commit('setDateTo', this.dateTo);
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>

</style>
