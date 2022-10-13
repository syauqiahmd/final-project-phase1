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

  static userCourse(req, res) {
    // const {id} = req.query
    const { id } = req.params
    let id_test
    Course.findAll({
      include: {
        model: User
      }
    })
      .then(course => {
        id_test = course[0].Users[0].UserCourse.UserId
        res.render('user/index', { course, id, id_test })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static userEnrolledCourse(req, res) {
    const { id } = req.params
    User.findByPk(id, 
      {include: [Profile, Course]}
      )
      .then(user => {
        console.log(user)
        res.render('user/userCourses', { user, id })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static userProfile(req, res) {
    const { id } = req.params
    Profile.findOne({
      where:{
        UserId: id
      }
    })
      .then(user => {
        // res.send(user)
        res.render('user/profile', { user, id })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editProfile(req, res) {
    const { id } = req.params
    const { firstName, lastName, dateOfBirth} = req.body
    Profile.update({firstName:firstName, lastName:lastName, dateOfBirth:dateOfBirth}, {
      where: {
        UserId: id
      }
    })
      .then(user => {
        res.redirect(`/users/${id}`)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static enrollCourse(req, res){
    const { id, courseId } = req.params
    UserCourse.findAll({
      where: {
        UserId: id,
        CourseId: courseId
      }
    })
      .then(result=>{
        if(result.length!=0){
          return res.redirect(`/users/${id}?err=test`)
        } else {
          return UserCourse.create({UserId:id, CourseId: courseId})
          .then(result=>{
            res.redirect(`/users/${id}?success=enrolled`)
          })
          .catch(err=>{
            res.send(err)
          })
        }
      })
      .catch(err=>{
        res.send(err)
      })
  }

  static destroyUserCourse(req, res){
    const { id, userCourseId } = req.params
    UserCourse.destroy({
      where:{
        UserId: id,
        CourseId:userCourseId
      }
    })
      .then(result=>{
        res.redirect(`/users/${id}/course`)
      })
      .catch(err=>{
        res.send(err)
      })
  }
}

module.exports = ControllerHome