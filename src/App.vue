<template>
  <v-app>
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
