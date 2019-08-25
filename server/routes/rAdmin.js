const router = require('express').Router()
const AdminController = require('../controllers/cAdmin')

router.post('/register', AdminController.create)
router.post('/login', AdminController.login)

module.exports = router