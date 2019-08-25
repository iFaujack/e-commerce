const product = require('../models/mProduct')

module.exports = (req,res,next) => {
    const {newItem} = req.body
    product.findById(newItem)
        .then(data => {
            if (data.stock > 0){
                product.findByIdAndUpdate(newItem, {$inc : {stock : -1}})
                    .then(data => {
                        next()
                    })
                    .catch(next)
            } else {
                let err = {};
                err.message = 'Out of stock'
                err.statusCode = 401
                next(err)
            }
        })
        .catch(next)
}