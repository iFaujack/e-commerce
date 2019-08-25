<template>
  <b-col cols="6" sm="4" md="3" lg="2">
        <b-card
          :title="item.name"
          :img-src="item.imageUrl"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text class="card-desc">{{item.description}}</b-card-text>
          <b-card-footer> {{item.price}} 💸 </b-card-footer>
          <b-button href="#" variant="success" @click.prevent="addCart(item._id)" class="btn-add">Add To Cart</b-button>
          <b-button href="#" variant="primary" @click.prevent="detail" class="btn-add">Detail</b-button>
        </b-card>
      </b-col>
</template>

<script>
export default {
    props: ['item'],
    methods: {
      detail(){
        this.$router.push('/products/'+this.item._id)
      },
      addCart(id){
        if(localStorage.token){
          this.$store.dispatch('addToCart',id)
        } else {
          this.$router.push('/login')
        }
        
      }
    }
}
</script>

<style>
.btn-add {
    width: 100%;
}
.card-desc{
    overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3; /* number of lines to show */
   line-height: 1;        /* fallback */
   max-height: 3*10; 
}

</style>