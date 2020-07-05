<template>
  <v-container class="page">
    <v-row>
      <v-col cols="12">

<!--      <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <ChatSocket/>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
// import ChatSocket from '@/components/ChatSocket.vue';

export default {
  name: 'home',
  components: {
    // HelloWorld,
    // ChatSocket,
  },
  data() {
    return {
      hui: '',
    };
  },
  methods: {
    update() {
      this.hui = 'asdsadas';
      // console.log(this.hui);
    },
  },
};
</script>
