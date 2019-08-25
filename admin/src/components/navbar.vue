<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Midas</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       <b-nav-item>
           <b-button variant="danger" @click.prevent="logout"> Logout </b-button>
       </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>