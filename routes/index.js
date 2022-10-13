const express = require('express')
const ControllerHome = require('../controllers/index')
const router = express.Router()

router.get('/', ControllerHome.home)
router.get('/login', ControllerHome.login)
router.get('/register', ControllerHome.register)
router.get('/users', ControllerHome.userHome)
router.get('/users/profile', ControllerHome.userProfile)
router.get('/users/course', ControllerHome.userCourse)
router.get('/users/print', ControllerHome.print)

module.exports = router