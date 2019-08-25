<template>
  <div>
    <navbar></navbar>
    <b-container>
      <b-row>
        <b-col cols="12" style="margin: 5px; padding: 5px;">
          <b-button variant='success' v-b-modal.modal-center>Add Item</b-button>
        </b-col>
        <listItem v-for="item in items" :key="item._id" :item="item"></listItem>
      </b-row>
    </b-container>
    <addItem></addItem>
  </div>
</template>

<script>
import navbar from '../components/navbar.vue';
import listItem from '../components/itemList.vue';
import addItem from '../components/addItem';
import axios from 'axios';
import { mapState } from 'vuex';


export default {
  data(){
    return {
    }
  },
  computed: mapState(['items']),
  components : {
    navbar,
    listItem,
    addItem
  },
  methods: {
    fetchData(){
      axios({
        method: 'get',
        url : 'http://localhost:3000/product/all'
      })
      .then(({ data }) => {
        this.$store.commit('allItems',data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    this.$store.dispatch('fetchData')
  }
}
</script>

<style>

</style>