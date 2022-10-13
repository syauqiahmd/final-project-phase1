// Happy coding guys
const express = require('express')
const app = express()
const session = require('express-session')
const engine = require('ejs-layout')
const router = require('./routes')

// setting app
const port = 3000
app.use(express.urlencoded({extended : false}))
app.set('view engine', 'ejs')
app.engine('ejs', engine.__express)
app.use("/public", express.static(__dirname + '/public'))

//set session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    sameSite: true 
  }
}))

//start routing
app.use(router)

// web server 
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})