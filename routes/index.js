const express = require('express')
const ControllerHome = require('../controllers/index')
const router = express.Router()

router.get('/', ControllerHome.home)
router.get('/login', ControllerHome.login)
router.post('/login', ControllerHome.redirectLogin)
router.get('/register', ControllerHome.register)
router.post('/register', ControllerHome.createUserProfile)
router.get('/users/:id', ControllerHome.userHome)
router.get('/users/:id/profile', ControllerHome.userProfile)
router.post('/users/:id/profile', ControllerHome.editProfile)
router.get('/users/:id/course', ControllerHome.userCourse)

module.exports = router