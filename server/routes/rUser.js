const router = require('express').Router()
const cUser = require('../controllers/cUser')

router.post('/login',cUser.login)
router.post('/register',cUser.register)
router.post('/loginOauth',cUser.loginFromOauth)

module.exports = router