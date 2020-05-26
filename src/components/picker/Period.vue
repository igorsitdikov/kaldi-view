<template>
  <v-card :raised=true>
    <v-card-title>Выберите период</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <datetime-picker label="С" v-model="dateFrom"></datetime-picker>
          </v-col>
          <v-col cols="6">
            <datetime-picker label="По" v-model="dateTo"></datetime-picker>
          </v-col>
        </v-row>
      </v-container>
      <v-btn dark @click="saveConfig">Принять</v-btn>
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
      return new Date(source).toISOString()
        .replace('T', ' ')
        .substring(0, 16);
    },
    saveConfig() {
      this.dateFrom = this.prepareDateTime(this.from);
      this.dateTo = this.prepareDateTime(this.to);
      this.$store.state.dateFromTo = `?from=${this.prepareDateTime(this.from)}&to=${this.prepareDateTime(this.to)}`;
      localStorage.setItem('selectedKeywords', JSON.stringify(this.$store.state.keyWordsSelectedList));
      localStorage.setItem('dateFromTo', this.$store.state.dateFromTo);
      localStorage.setItem('dateFrom', this.dateFrom);
      localStorage.setItem('dateTo', this.dateTo);
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>

</style>
