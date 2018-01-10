var express=require('express')
var static =require('express-static')
var router=require('./router/node')
var app=express()
app.listen(8000)
app.use('/user',router)


app.use(static('./pubice'))