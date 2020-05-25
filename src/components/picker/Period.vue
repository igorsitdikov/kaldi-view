<template>
  <v-card :raised=true>
    <v-card-title>Выберите период</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <datetime-picker label="С" v-model="from"></datetime-picker>
          </v-col>
          <v-col cols="6">
            <datetime-picker label="По" v-model="to"></datetime-picker>
          </v-col>
        </v-row>
      </v-container>
      <v-btn dark @click="saveConfig">Принять</v-btn>
    </v-card-text>
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
  data: () => ({
    dateFrom: null,
    dateTo: null,
  }),
  methods: {
    prepareDateTime(source) {
      return new Date(source).toISOString()
        .replace('T', ' ')
        .substring(0, 16);
    },
    saveConfig() {
      this.from = this.prepareDateTime(this.from);
      this.to = this.prepareDateTime(this.to);
      this.$store.state.dateFromTo = `?from=${this.prepareDateTime(this.from)}&to=${this.prepareDateTime(this.to)}`;
      localStorage.setItem('selectedKeywords', JSON.stringify(this.$store.state.keyWordsSelectedList));
      localStorage.setItem('dateFromTo', this.$store.state.dateFromTo);
      localStorage.setItem('dateFrom', this.from);
      localStorage.setItem('dateTo', this.to);

      this.$alert('Настройки применены!', '', 'success')
        .then(() => {
          // console.log('saved');
        });
    },
  },
};
</script>

<style scoped>

</style>
