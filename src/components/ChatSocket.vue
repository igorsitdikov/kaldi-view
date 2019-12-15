<template>
  <div>
    <h1>Chat Socket</h1>
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <!--              <label for="connect">WebSocket connection:</label>-->
              <button :disabled="connected"
                      @click="connect">Connect
              </button>
              <button id="disconnect" @click="disconnect"
                      :disabled="!connected">
                Disconnect
              </button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="name">What is your name?</label>
              <input type="text" id="name" class="form-control" placeholder="Your name here..."
                     v-model="name">
            </div>
            <button id="send" class="btn btn-default" @click="sendName" type="submit">Send</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table id="conversation" class="table table-striped">
            <thead>
            <tr>
              <th>Greetings</th>
            </tr>
            </thead>
            <tbody id="greetings">
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <button @click="connect">Connect</button>
    <button @click="disconnect">Disconnect</button>
    <button @click="sendName" type="submit">Send</button>
    <div><p>{{hui}}</p></div>
  </div>
</template>

<script>
const StompClient = require('stompjs');
const SockJS = require('sockjs-client');

export default {
  name: 'ChatSocket',
  data() {
    return {
      stompClient: null,
      connected: false,
      name: 'loh',
      hui: '',
    };
  },
  created() {

  },
  methods: {
    update() {
      this.hui = 'asdsadas';
      console.log(this.hui);
    },
    connect() {
      const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
      socket.onmessage = function (data) { console.log(data); };
      this.stompClient = StompClient.over(socket);
      console.log(this.stompClient);
      this.stompClient.connect({}, (frame) => {
        this.connected = true;
        console.log(`Connected: ${frame}`);
        this.stompClient.subscribe('/topic/greetings', (greeting) => {
          console.log('Request');
          console.log(greeting.body);
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
