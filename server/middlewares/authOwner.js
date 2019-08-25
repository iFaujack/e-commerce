const Cart = require('../models/mCart')

module.exports = (req,res,next) => {
    let ownerId = req.decode.id
    let { id } = req.params
    Cart.findById(id)
        .then(data => {
            if (data.ownerId == ownerId){
                next()
            } else {
                let err = {}
                err.message = 'Youre action is fail',
                err.statusCode = 401
                next(err)
            }
        })
        .catch(err => {
            console.log('error')
        })
}