const router = require('express').Router()
const rUser = require('./rUser')
const rAdmin = require('./rAdmin')
const rProduct = require('./rProducts')
const rCart = require('./rCart')


router.get('/',(req,res,next) => { res.status(200).json({message : "Connected"})})
router.use('/user',rUser)
router.use('/admin',rAdmin)
router.use('/product',rProduct)
router.use('/cart',rCart)

module.exports = router