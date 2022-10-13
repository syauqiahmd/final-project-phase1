class ControllerHome{
  static home(req,res){
    res.render('public/index')
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