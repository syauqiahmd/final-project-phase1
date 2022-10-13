const express = require('express')
const ControllerHome = require('../controllers/index')
const router = express.Router()

router.get('/', ControllerHome.home)
router.get('/login', ControllerHome.login)
router.get('/register', ControllerHome.register)

module.exports = router