<template>
  <b-col cols="12">
      <b-card no-body class="overflow-hidden" style="max-width: 100%;">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img :src="item.imageUrl" style="height: 100%;" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body :title="item.name">
              <b-card-text>
                {{item.description}}
              </b-card-text>
              <p> Price : {{item.price}} </p>
              <b-button variant="danger"> Remove from cart </b-button>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
  </b-col>
</template>

<script>
export default {
    props: ['item'],
    created(){
      console.log(this.item)
    }
}
</script>

<style>

</style>