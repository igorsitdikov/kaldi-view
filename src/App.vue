<template>
  <v-app class="background-app">
    <NavSidebar></NavSidebar>
    <router-view/>
  </v-app>
</template>

<script>
import NavSidebar from './components/sidebars/NavSidebar.vue';

export default {
  name: 'App',
  components: {
    NavSidebar,
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
  .background-app {
    background: #00695C !important;
    /*background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #62e81a);*/
    /*background: linear-gradient(to right, #FFAF7B, #D76D77, #62e81a);*/
  }
</style>
