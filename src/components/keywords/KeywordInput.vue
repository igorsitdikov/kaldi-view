<template>
  <v-text-field v-model="keyword" label="Например, вооружение">
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
                 @click="add">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'InputKeyword',
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
    add() {
      if (this.keyword !== '') {
        this.$root.$emit('addKeyword', this.keyword);
        this.keyword = '';
      }
    },
  },
};
</script>

<style scoped>

</style>
