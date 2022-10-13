const express = require('express')
const ControllerHome = require('../controllers/index')
const router = express.Router()

router.get('/', ControllerHome.home)
router.get('/register', ControllerHome.register)
router.post('/register', ControllerHome.createUserProfile)
router.get('/login', ControllerHome.login)
router.post('/login', ControllerHome.redirectLogin)

router.use((req, res, next) => {
    console.log(req.session);
    if (!req.session.email) {
        const error = 'Please Login First'
        res.redirect(`/login?err=${error}`)
    } else {
        next()
    }
})

router.get('/users/:id', ControllerHome.userCourse)
router.get('/users/:id/profile', ControllerHome.userProfile)
router.post('/users/:id/profile', ControllerHome.editProfile)
router.get('/users/:id/course', ControllerHome.userEnrolledCourse)
router.get('/users/:id/enroll/:courseId', ControllerHome.enrollCourse)
router.get('/users/:id/destroy/:userCourseId', ControllerHome.destroyUserCourse)
router.get('/users/:id/status/:userCourseId', ControllerHome.updateUserCourseStatus)

module.exports = router