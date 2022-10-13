const { Category, Course, UserCourse, User, Profile } = require('../models')
const InvoiceBill = require('invoice-bill');

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

  static print(req, res){
    const sample = new InvoiceBill({
      billIDGenerator: {preFlightValue: 1, mode: 'padding'},
      currency: 'IDR',
      from: {issuer: 'RuangTuru'},
      to: 'Some body',
    });
    sample.newRecords({itemName: 'test1', itemBasePrice: 10});
    sample.newRecords({itemName: 'test2', itemBasePrice: 5, itemCount: 2, discount: 5});
    const test = sample.renderToHTML();
    require('fs').writeFileSync('test.html', test);
    sample.renderPDF('./public/invoices-generated', {format: 'Letter', orientation: 'landscape'})
      .then((filePath) => {
        console.log(`PDF file generated @ ${filePath}`)
        res.redirect('/')
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = ControllerHome