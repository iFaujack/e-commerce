<template>
  <b-container style="height: 90vh">
    <h2 class="pt-5 pb-5">Register User</h2>
    <b-row>
      <b-col cols="6" offset="3" class="pt-5 pb-5">
        <b-form @submit="onSubmit" @reset="onReset"  ref="form" style="text-align: left;">
          <b-form-group
            label="Fullname"
            label-for="fullname"
            >
            <b-form-input
             id="fullname"
             v-model="form.fullname"
             type="text"
             required
             placeholder="Enter Fullname">
            </b-form-input>

          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Password:"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
           <b-button variant="secondary" type="submit" class="mt-4 w-100"> Submit </b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import mapState from 'vuex'

export default {
  data() {
    return {
      form: {
        email: '',
        password : '',
        fullname : '',
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      swal.showLoading()
      axios({
        method : 'post',
        data : {fullname: this.form.fullname, email: this.form.email, password: this.form.password},
        url: 'http://localhost:3000/user/register'
      })
      .then( ({ data }) => {
        this.$router.push('/login')
        swal.fire({
          type: 'success',
          title: 'successfuly Login'
        })
      })
      .catch( err => {
        console.log(err)
        swal.fire({
          type: 'error',
          title : err.response.data.message
        })
      })
      // alert(JSON.stringify(this.form));
    //   this.$refs.form.reset()
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.password = '';
      this.form.email = '';
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
</style>