const { Category, Course, UserCourse, User, Profile } = require('../models')
const { Op } = require('sequelize')
const bcryptjs = require('bcryptjs')

class ControllerHome {
  static home(req, res) {
    const { search } = req.query
    let options = {}
    if (search) {
      options = {
          where: {
              name: {
                  [Op.iLike]: `%${search}%` 
              }
          }
      }
  }
    Course.findAll(options)
      .then(crs => {
        res.render('public/index', { crs })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static login(req, res) {
    res.render('public/login')
  }

  static redirectLogin(req, res) {
    const { email, password } = req.body
    let userid;
    User.findOne({
      where: {
        email: email
      }
    })
      .then(result => {
        let inputPw = password
        let dataPw = result.dataValues.password
        let pwCheck = bcryptjs.compareSync(inputPw, dataPw)
        if (pwCheck) {
          return result
        }
        let errorPw = 'Password-Incorrect'
        res.redirect(`/login?err=${errorPw}`)
      })
      .then(result => {
        userid = result.dataValues.id
        res.redirect(`/users/${userid}`)
      })
      .catch(err => {
        let errors = err
        if (err.name == 'SequelizeValidationError') {
          errors = err.errors.map(el => el.message)
        }
        res.redirect(`/login?err=${errors}`)
      })
  }

  static register(req, res) {
    res.render('public/register')
  }

  static createUserProfile(req, res) {
    const { firstName, lastName, dateOfBirth, email, password } = req.body
    let dataUser = { firstName, lastName, dateOfBirth, email, password }
    if (!dataUser.firstName || !dataUser.lastName || !dataUser.dateOfBirth) {
      let errorProfile = 'Please enter First Name, Last Name or Date of Birth'
      res.redirect(`/register?err=${errorProfile}`)
    } else {
      User.create({ email, password })
        .then(() => {
          return User.findOne({
            order: [['id', 'DESC']]
          })
        })
        .then(result => {
          let UserId = result.dataValues.id
          return Profile.create({ firstName, lastName, dateOfBirth, UserId })
        })
        .then(() => {
          res.redirect(`/login`)
        })
        .catch(err => {
          let errors = err
          if (err.name == 'SequelizeValidationError') {
            errors = err.errors.map(el => el.message)
          }
          res.redirect(`/register?err=${errors}`)
        })
    }
  }

  static userHome(req, res) {
    // const {id} = req.query
    const { id } = req.params
    User.findOne({
      include: [{
        model: Course
      },
      {
        model: Profile
      }]
      ,
      where: {
        id: id
      }
    })
      .then(user => {
        res.render('user/index', { user })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static userProfile(req, res) {
    const { id } = req.params
    User.findOne({
      include: [{
        model: Course
      },
      {
        model: Profile
      }]
      ,
      where: {
        id: id
      }
    })
      .then(user => {
        res.render('user/index', { user })
      })
      .catch(err => {
        res.send(err)
      })
    res.render('user/profile')
  }

  static editProfile(req, res) {
    const { id } = req.params
    Profile.update({
      where: {
        id: id
      }
    })
      .then(user => {
        res.render('user/index', { user })
        // res.send(user)
      })
      .catch(err => {
        res.send(err)
      })
    res.render('user/profile')
  }

  static userCourse(req, res) {
    res.render('user/userCourses')
  }
}

module.exports = ControllerHome