const express = require('express')
const ControllerHome = require('../controllers/index')
const router = express.Router()

router.get('/', ControllerHome.home)

module.exports = router