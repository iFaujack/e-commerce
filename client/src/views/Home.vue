<template>
  <div class="home">
      <carousel></carousel>
      <list-content>
      </list-content>
  </div>
</template>

<script>
// @ is an alias to /src
import carousel from '../components/home/carousel.vue';
import listContent from '../components/home/listContent.vue';

export default {
  name: 'home',
  components: {
    carousel,
    listContent,
  },
};
</script>

<style scoped>
.home {
  /* background-image: url("https://www.dotafire.com/css/img/bg-main.jpg"); */
}
</style>
