const router = require('express').Router()
const ProductController = require('../controllers/cProduct')
const {sendUploadToGCS,multer} = require('../middlewares/images')
const authAdmin = require('../middlewares/authAdmin')
const authToken = require('../middlewares/authToken')

router.get('/all',ProductController.all)
router.get('/find/:id',ProductController.find)
router.post('/create', authToken, authAdmin, multer.single('image'),sendUploadToGCS,ProductController.addProduct)
router.delete('/delete/:id', authToken, authAdmin, ProductController.deleteProduct)
router.put('/update/:id', authToken, authAdmin, multer.single('image'),sendUploadToGCS, ProductController.updateProduct)

module.exports = router