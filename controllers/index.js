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
      res.send(crs)
    })
    .catch(err => {
      res.send(err)
    })
  }

  static show
}

module.exports = ControllerHome