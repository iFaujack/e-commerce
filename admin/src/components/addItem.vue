<template>
  <div>
    <b-modal id="modal-center" centered title="BootstrapVue">
      <b-form >
        <b-form-group
          id="name-1"
          label="Item Name"
          label-for="name"
        >
          <b-form-input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter Name Item"
          ></b-form-input>
        </b-form-group>
        <b-form-group
                id="image-1"
                label="Item Image"
                label-for="image"
            >
          <b-form-file
            id="image"
            v-model="form.image"
            required
            placeholder="Enter Item Image"
          ></b-form-file>
        </b-form-group>
        <b-form-group
                id="stock-1"
                label="Stock"
                label-for="stock"
            >
          <b-form-input
            id="stock"
            v-model="form.stock"
            type = "number"
            required
            placeholder="Enter Stock item"
          ></b-form-input>
        </b-form-group>
         <b-form-group
                id="price-1"
                label="price"
                label-for="price"
            >
          <b-form-input
            id="price"
            v-model="form.price"
            type = "number"
            required
            placeholder="Enter Price item"
          ></b-form-input>
        </b-form-group>
         <b-form-group
                id="description-1"
                label="description"
                label-for="description"
            >
          <b-form-textarea
            id="description"
            v-model="form.description"
            required
            placeholder="Enter description item"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
      <template slot="modal-footer">
          <b-button type="submit" variant="primary" @click.prevent="addItem">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return{
            form : {
                name: '',
                image: '',
                description : '',
                price: '',
                stock: '',
            }
        }
    },
    methods: {
        addItem(){
            const formData = new FormData()
            formData.set('name', this.form.name)
            formData.set('image', this.form.image)
            formData.set('price',this.form.price)
            formData.set('stock',this.form.stock)
            formData.set('description', this.form.description)
            this.$store.dispatch('addItem', formData)
            Swal.showLoading()
        }
    }
};
</script>

<style>
</style>