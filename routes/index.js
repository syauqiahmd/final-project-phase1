const express = require('express')
const ControllerHome = require('../controllers/index')
const router = express.Router()

router.get('/', ControllerHome.home)
router.get('/login', ControllerHome.login)
router.post('/login', ControllerHome.redirectLogin)
router.get('/register', ControllerHome.register)
router.post('/register', ControllerHome.createUserProfile)
router.get('/users/:id', ControllerHome.userCourse)
router.get('/users/:id/profile', ControllerHome.userProfile)
router.post('/users/:id/profile', ControllerHome.editProfile)
router.get('/users/:id/course', ControllerHome.userEnrolledCourse)
router.get('/users/:id/enroll/:courseId', ControllerHome.enrollCourse)
router.get('/users/:id/destroy/:userCourseId', ControllerHome.destroyUserCourse)

module.exports = router