const router = require('express').Router()
const CartController = require('../controllers/cCart')
const authOwner = require('../middlewares/authOwner')
const authToken = require('../middlewares/authToken')
const authStock = require('../middlewares/authStock')

router.patch('/addItem/:id', authToken, authOwner, authStock, CartController.addItem)
router.patch('/removeItem/:id', authToken, authOwner, CartController.addItem)
router.get('/mycart', authToken, CartController.myCart)

module.exports = router