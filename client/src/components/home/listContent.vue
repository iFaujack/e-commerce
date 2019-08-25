<template>
  <b-container fluid class="items">
    <b-row>
        <itemCard v-for="item in items" :key="item.id" :item="item"></itemCard>
        <router-view ref='modal'></router-view>
    </b-row>
  </b-container>
</template>

<script>
import itemCard from "../home/itemCard";
import axios from 'axios'
export default {
  data() {
    return {
      items: []
    };
  },
  watch: {
      '$route.params.id': function (){
          console.log('aa')
          this.$refs.modal.showModal()
      }
  },
  methods: {},
  components : {
      itemCard,
  },
  created(){
    axios({
      method: 'get',
      url : 'http://localhost:3000/product/all'
    })
    .then( ({data})=> {
      this.items = data
    })
    .catch(err => {
      console.log(err)
    })
  }
};
</script>

<style>
.items {
  background-color: #f2f2f2;
  padding: 5vh;
  min-height: 50vh;
  align-content: center;
}
</style>
