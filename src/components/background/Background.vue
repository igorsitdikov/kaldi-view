<template>
  <vue-particles class="particles-js" color="#000000"
                 :particleOpacity="0.7"
                 :particlesNumber="80"
                 shapeType="circle"
                 :particleSize="4"
                 linesColor="#3b1a3d"
                 :linesWidth="1"
                 :lineLinked="true"
                 :lineOpacity="0.4"
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
    left: 0;
    width:100%;
    height:100%;
    /*background-color: #3b1a3d;*/
    /*z-index:-1;*/
  }
</style>
