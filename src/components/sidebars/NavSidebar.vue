<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    :expand-on-hover=true
    style="z-index: 1000"
    fixed
    class="blue-grey darken-1"
    permanent
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="../../assets/logo.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-title>Acoustic</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in routes"
        :key="item.title"
        link
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title @click.stop="changeModalState" v-if="item.project">
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-title v-else>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'NavSidebar',
  components: {
  },
  computed: {
    filteredRoutes() {
      return this.routes.filter((el) => {
        if (el.admin && !this.$store.state.player.login.role) {
          return false;
        }
        return !(!el.admin && !this.$store.state.player.login.authorized);
      });
    },
  },
  data: () => ({
    mini: true,
    drawer: true,
    drawerRight: false,
    dialog: false,
    routes: [
      // {
      //   title: 'Home',
      //   icon: 'mdi-home-city',
      //   admin: false,
      //   link: '/',
      //   project: false,
      // },
      {
        title: 'Player',
        icon: 'mdi-play-circle-outline',
        admin: false,
        link: '/player',
        project: false,
      },
      {
        title: 'Settings',
        icon: 'mdi-cog',
        admin: false,
        link: '/settings',
        project: false,
      },
    ],
  }),
  methods: {
    changeModalState() {
      this.$store.commit('toggleProjectSidebar');
    },
  },
};
</script>

<style scoped>

</style>
