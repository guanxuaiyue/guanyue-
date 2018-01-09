var express=require('express')
var static=require('express-static')

var user=require("./router/router")
var app=express()

app.listen(8002)
app.use('/user',user)




app.use(static('./publice'))



