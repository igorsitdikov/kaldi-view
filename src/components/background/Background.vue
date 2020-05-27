<template>
  <vue-particles class="particles-js" color="#42b983"
                 :particleOpacity="0.7"
                 :particlesNumber="80"
                 shapeType="circle"
                 :particleSize="4"
                 linesColor="#42b983"
                 :linesWidth="1"
                 :lineLinked="true"
                 :lineOpacity="0.9"
                 :linesDistance="150"
                 :moveSpeed="3"
                 :hoverEffect="true"
                 hoverMode="grab"
                 :clickEffect="true"
                 clickMode="push"></vue-particles>
</template>

<script>
export default {
  name: 'Background',
};
</script>

<style scoped>
  .particles-js {
    position : absolute;
    width:100%;
    height:100%;
    /*z-index:-1;*/
  }
</style>
