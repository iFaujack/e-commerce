const Cart = require('../models/mCart')

class CartController {
    static update(req,res,next){
        let {id} = req.body
        Cart.findByIdAndUpdate(id, {isCheckout : true}, {new: true}).populate('products')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static myCart(req,res,next){
        let ownerId = req.decode.id
        Cart.findOne({ ownerId, isCheckout: false }).populate('products')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static addItem(req,res,next) {
        let {id} = req.params
        let {newItem} = req.body
        Cart.findByIdAndUpdate({_id : id}, {$push : {products : newItem}} , {new : true})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static removeItem(req,res,next){
        let {id, removeItem} = req.body
        Cart.update({_id : id}, {$pull : {products : removeItem}} , {new : true})
            .then(data => {
                res.status(200),json(data)
            })
            .catch(next)
    }

    static create(id){
        Cart.create({
            ownerId : id,
            isCheckout : false
        })
    }
}


module.exports = CartController