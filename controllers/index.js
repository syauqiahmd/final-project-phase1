const { Category, Course, UserCourse, User, Profile } = require('../models')
const { Op } = require('sequelize')
const bcryptjs = require('bcryptjs')
const InvoiceBill = require('invoice-bill');
// const session = require('express-session')

class ControllerHome {
  static home(req, res) {
    const { search } = req.query
    let options = {}
    options.include = User
    if (search) {
      options.where= {
              name: {
                  [Op.iLike]: `%${search}%` 
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
        let dataPw = result.password
        let pwCheck = bcryptjs.compareSync(inputPw, dataPw)
        if (pwCheck == false) {
          //gagal login
          let errorPw = 'Password-Incorrect'
          return res.redirect(`/login?err=${errorPw}`)
        } else {
          //berhasil login
          userid = result.id
          req.session.email = result.email
          res.redirect(`/users/${userid}`)
        }
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
    const { id } = req.params
    const { filter } = req.query
    console.log(filter)
    let option = Course.getCourseByCategory(filter)
    option.include = User

    let id_test
    let course
    Course.findAll(option)
      .then(result => {
        course = result
        return Category.findAll()
      })
      .then(categories =>{
        res.render('user/index', { course, categories, id, id_test })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static userEnrolledCourse(req, res) {
    const { id } = req.params
    User.findByPk(id,
      { include: [Profile, Course] }
    )
      .then(user => {
        res.render('user/userCourses', { user, id })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static userProfile(req, res) {
    const { id } = req.params
    Profile.findOne({
      where: {
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
    const { firstName, lastName, dateOfBirth } = req.body
    Profile.update({ firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth }, {
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

  static enrollCourse(req, res) {
    const { id, courseId } = req.params
    UserCourse.findAll({
      where: {
        UserId: id,
        CourseId: courseId
      }
    })
      .then(result => {
        if (result.length != 0) {
          return res.redirect(`/users/${id}?err=test`)
        } else {
          return UserCourse.create({ UserId: id, CourseId: courseId })
            .then(result => {
              res.redirect(`/users/${id}?success=enrolled`)
            })
            .catch(err => {
              res.send(err)
            })
        }
      })
      .catch(err => {
        res.send(err)
      })
  }

  static destroyUserCourse(req, res) {
    const { id, userCourseId } = req.params
    UserCourse.destroy({
      where: {
        UserId: id,
        CourseId: userCourseId
      }
    })
      .then(result => {
        res.redirect(`/users/${id}/course`)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static updateUserCourseStatus(req, res) {
    const { id, userCourseId } = req.params
    UserCourse.update({ isComplete: true }, {
      where: {
        UserId: id,
        CourseId: userCourseId
      }
    })
      .then(result => {
        res.redirect(`/users/${id}/course`)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static destroySession(req,res){
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    })
  }

  static print(req, res){
    const { id, userCourseId } = req.params
    const invoice = new InvoiceBill({
      billIDGenerator: {preFlightValue: 1, mode: 'padding'},
      currency: 'IDR',
      from: {issuer: 'RuangTuru'},
      to: 'Some body',
    });
    let dataCourse
    Course.findByPk(userCourseId)
      .then(result=>{
        dataCourse = result
      })
      .catch(err=>{
        res.send(err)
      })
    invoice.newRecords({itemName: 'test1', itemBasePrice: 10});
    invoice.newRecords({itemName: 'test2', itemBasePrice: 5, itemCount: 2, discount: 5});
    invoice.renderPDF('./public/invoices-generated', {format: 'Letter', orientation: 'landscape'})
      .then((filePath) => {
        let newPath = filePath.split('/')
        newPath = newPath[newPath.length-1]
        console.log(`PDF file generated @ ${newPath}`)
        res.render('user/printPreview', {newPath})
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = ControllerHome