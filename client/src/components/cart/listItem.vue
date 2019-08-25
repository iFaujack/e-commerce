<template>
  <b-container>
      <b-row>
          <itemCart v-for="item in cart.products" :key="item._id" :item="item"></itemCart>
      </b-row>
  </b-container>
</template>

<script>
import itemCart from '../cart/itemCart'
import { mapState }from 'vuex';

export default {
    components: {
        itemCart,
    },
    computed: mapState(['cart'])
    
}
</script>

<style>

</style>