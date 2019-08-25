<template>
  <b-navbar toggleable="md" type="dark" variant="info" class="navbar-font">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click.prevent="home">Home</b-nav-item>
        <b-nav-item @click.prevent="products">Products</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="md" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="md" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
        <b-nav-item>
          <b-button variant="primary" v-if="!isLogin" @click.prevent="login">Login</b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button variant="success" v-if="!isLogin" @click.prevent="register">Register</b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button variant="danger" v-if="isLogin" @click.prevent="logout" > Logout </b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button variant="success" v-if="isLogin" @click.prevent="toCart" > My Cart {{cart.products.length}} </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex';
import swal from 'sweetalert2';


export default {
  computed: mapState(['isLogin','cart']),
  methods: {
    home() {
      this.$router.push('/');
    },
    about() {
      this.$router.push('/about');
    },
    login() {
      this.$router.push('/login');
    },
    products() {
      this.$router.push('/products');
    },
    toCart(){
      this.$router.push('/cart')
    },
    logout(){
      localStorage.clear();
      this.$store.commit('loginStatus', false)
      swal.fire({
        type: 'success',
        title: 'Successfully logout',
      })
    },
    register(){
      this.$router.push('/register')
    }
  },
  created(){
    
  }
};
</script>

<style>
.navbar-font {
  font-size: 20px;
}
</style>
