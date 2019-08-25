import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert2';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin : false,
    items : [],
  },
  mutations: {
    statusLogin(state, payload){
      state.isLogin = payload;
    },
    allItems(state, payload){
      state.items = payload
    }
  },
  actions: { 
    fetchData(context){
      axios({
        method: 'get',
        url : 'http://localhost:3000/product/all'
      })
      .then(({ data }) => {
        context.commit('allItems',data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteData(context,payload){
      const token = localStorage.getItem('token');
      axios({
        method: 'delete',
        headers: {token},
        url: `http://localhost:3000/product/delete/${payload}`
      })
      .then( ({ data }) => {
        context.dispatch('fetchData')
        swal.fire({
          type: 'success',
          title: 'Succesfully delete'
        })
      })
      .catch( err  => {
        swal.fire({
          type: 'error',
          title: err.response.data.message
        })
        console.log(err)
      })
    },
    addItem(context,payload){
      const token = localStorage.getItem('token')
      console.log('add item')
      axios({
        method: 'post',
        headers: {token},
        url: `http://localhost:3000/product/create`,
        data : payload
      })
      .then( ({ data }) => {
        context.dispatch('fetchData');
        swal.fire({
          type: 'success',
          title: 'Succesfully add item'
        })
      })
      .catch(err => {
        console.log(err)
        swal.fire({
          type: 'error',
          title: err.response.data.message
        })
      })
    }

  },
});
