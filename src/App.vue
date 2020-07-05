<template>
  <v-app class="background-app">
    <NavSidebar></NavSidebar>
    <router-view/>
  </v-app>
</template>

<script>
import NavSidebar from './components/sidebars/NavSidebar.vue';
import domain from './config/config';

export default {
  name: 'App',
  components: {
    NavSidebar,
  },
  mounted() {
    console.log(process.env.VUE_APP_DOMAIN);
    console.log(domain);
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
  .background-app {
    background: #A5D6A7 !important;
    /*background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #62e81a);*/
    /*background: linear-gradient(to right, #FFAF7B, #D76D77, #62e81a);*/
  }
</style>
