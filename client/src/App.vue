<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    NavBar,
    Footer,
  },
  created(){
    if (localStorage.token){
      this.$store.dispatch('getMyCart')
      this.$store.commit('loginStatus',true)
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
