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
}

module.exports = ControllerHome