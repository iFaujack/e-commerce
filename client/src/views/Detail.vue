<template>
  <b-modal ref="modal" id="modal-lg" size="lg">
    <b-container>
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
              <p> Stock : {{item.stock}} </p>
              <p> Price : {{item.price}} </p>
              <b-button variant="success" @click.prevent="addToCart(item._id)"> Add to cart </b-button>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </b-modal>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      item: {}
    };
  },
  created() {
    this.fetchData();
  },
   watch: {
      '$route.params.id': function (){
          this.fetchData()
      }
  },
  methods: {
    fetchData() {
      let id = this.$route.params.id;
      axios({
        method: "get",
        url: `http://localhost:3000/product/find/${id}`
      })
        .then(({ data }) => {
          this.item = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    showModal() {
      this.$refs.modal.show();
    },
    addToCart(id){
      this.$store.dispatch('addToCart',id)
    }
  }
};
</script>

<style>
</style>