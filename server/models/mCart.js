const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    ownerId : { type: Schema.Types.ObjectId, ref: 'User'},
    products : [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    isCheckout : Boolean
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart