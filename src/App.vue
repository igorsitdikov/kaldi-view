<template>
  <div id="app">
    <v-app>
      <NavSidebar></NavSidebar>
      <router-view/>
    </v-app>
  </div>
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
