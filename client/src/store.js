import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert2';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin : false,
        cart : [],
    },
    mutations: {
        loginStatus(state,payload){
            state.isLogin = payload
        },
        saveCart(state,payload){
            state.cart = payload;
        }
    },
    actions : {
        getMyCart(context){
            const token = localStorage.getItem('token')
            axios({
                method: 'get',
                url : 'http://localhost:3000/cart/mycart',
                headers : {token}
            })
            .then( ({ data }) => {
                context.commit('saveCart', data);
            })
            .catch(err => { 
                console.log(err.response)
            })
        },
        addToCart(context, payload){
            const token = localStorage.getItem('token')
            axios({
                method: 'patch',
                data : {newItem: payload},
                headers: {token},
                url: `http://localhost:3000/cart/addItem/${context.state.cart._id}`,
            })
            .then(({ data }) => {
                context.dispatch('getMyCart');
                swal.fire({
                    type: 'success',
                    title: 'Success add to cart!'
                })
            })
            .catch(err => {
                console.log(err.response)
                swal.fire({
                    type: 'error',
                    title: err.response.data.message
                })
            })
        }
    }
})
