<template>
<div>
  <b-card no-body style="width: 100%;">
    <b-row>
      <b-col md="4">
        <b-card-img :src="item.imageUrl" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="8">
        <b-card-body :title="item.name">
          <b-card-text>
            <p> {{item.description}} </p>
            <p>  PRICE : {{item.price}} </p> 
            <p> STOCK : {{item.stock}} </p>
            <b-button variant="danger" @click.prevent="deleteData(item._id)"> Delete </b-button>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        deleteData(id){
            this.$store.dispatch('deleteData', id)
        }
    }
}
</script>

<style>

</style>