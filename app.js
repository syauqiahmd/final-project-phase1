// Happy coding guys
const express = require('express')
const app = express()
const engine = require('ejs-layout')
const router = require('./routes')

// setting app
const port = 3000
app.use(express.urlencoded({extended : false}))
app.set('view engine', 'ejs')
app.engine('ejs', engine.__express)
app.use("/public", express.static(__dirname + '/public'))
app.use(router)

// web server 
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})