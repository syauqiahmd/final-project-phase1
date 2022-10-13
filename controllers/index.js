const { Category, Course, UserCourse, User, Profile } = require('../models')

class ControllerHome {
  static home(req, res) {
    // User.findAll({
    //   include: [{
    //     model: Course
    //   },
    //   {
    //     model: Profile
    //   }]
    // })
    //   .then(cat => {
    //     res.send(cat)
    //   })
    //   .catch(err => {
    //     res.send(err)
    //   })
    Course.findAll()
      .then(crs => {
        res.render('public/index', {crs})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static login(req,res){
    res.render('public/login')
  }
  static register(req,res){
    res.render('public/register')
  }

  static userHome(req,res){
    res.render('user/index')
  }

  static userProfile(req,res){
    res.render('user/profile')
  }

  static userCourse(req,res){
    res.render('user/userCourses')
  }
}

module.exports = ControllerHome