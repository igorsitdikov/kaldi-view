<template>
  <div>
    <h1>Chat Socket</h1>
<!--    <div id="main-content" class="container">-->
<!--      <div class="row">-->
<!--        <div class="col-md-6">-->
<!--          <form class="form-inline">-->
<!--            <div class="form-group">-->
<!--                            <label for="connect">WebSocket connection:</label>-->
<!--              <button :disabled="connected"-->
<!--                      @click="connect">Connect-->
<!--              </button>-->
<!--              <button id="disconnect" @click="disconnect"-->
<!--                      :disabled="!connected">-->
<!--                Disconnect-->
<!--              </button>-->
<!--            </div>-->
<!--          </form>-->
<!--        </div>-->
<!--        <div class="col-md-6">-->
<!--          <form class="form-inline">-->
<!--            <div class="form-group">-->
<!--              <label for="name">What is your name?</label>-->
<!--              <input type="text" id="name" class="form-control"
 placeholder="Your name here..."-->
<!--                     v-model="name">-->
<!--            </div>-->
<!--            <button id="send" class="btn btn-default"
 @click="sendName" type="submit">Send</button>-->
<!--          </form>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="row">-->
<!--        <div class="col-md-12">-->
<!--          <table id="conversation" class="table table-striped">-->
<!--            <thead>-->
<!--            <tr>-->
<!--              <th>Greetings</th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody id="greetings">-->
<!--            </tbody>-->
<!--          </table>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <button @click="connect">Connect Default</button>
    <button @click="connectNotTranscr">Connect to not transcribed</button>
    <button @click="disconnect">Disconnect</button>
    <button @click="sendName" type="submit">Send</button>
    <div><p>{{hui}}</p></div>
    <div>
      <ul>
        <li v-for="item in notTranscr" v-bind:key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import domain from '../config/config';

const StompClient = require('stompjs');
const SockJS = require('sockjs-client');

export default {
  name: 'ChatSocket',
  data() {
    return {
      stompClient: null,
      stompClientNotTranscr: null,
      connected: false,
      name: 'loh',
      hui: '',
      notTranscr: [],
    };
  },
  created() {

  },
  methods: {
    update() {
      this.hui = '';
    },
    connectNotTranscr() {
      const socket = new SockJS(`${domain}/gs-guide-websocket`);
      this.stompClientNotTranscr = StompClient.over(socket);
      // this.stompClientNotTranscr.debug = null;
      // console.log(this.stompClientNotTranscr);
      this.stompClientNotTranscr.connect({}, (frame) => {
        this.connected = true;
        // console.log(`Connected: ${frame}`);
        this.stompClientNotTranscr.subscribe('/topic/nottranscribed', (greeting) => {
          // console.log('Request');
          // console.log(greeting.body);
          this.notTranscr = JSON.parse(greeting.body);
        });
      });
    },
    connect() {
      const socket = new SockJS(`${domain}/gs-guide-websocket`);
      this.stompClient = StompClient.over(socket);
      this.stompClient.debug = null;
      // console.log(this.stompClient);
      this.stompClient.connect({}, (frame) => {
        this.connected = true;
        // console.log(`Connected: ${frame}`);
        this.stompClient.subscribe('/topic/greetings', (greeting) => {
          // console.log('Request');
          // console.log(greeting.body);
          this.hui = greeting.body;
        });
      });
    },
    disconnect() {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
      this.connected = false;
      console.log('Disconnected');
    },
    sendName() {
      this.stompClient.send('/app/hello', {}, JSON.stringify({ name: this.name }));
    },
  },
};
</script>

<style scoped>

</style>
