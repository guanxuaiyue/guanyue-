const express = require('express');
const bodyParser = require('body-parser');
const static = require('express-static');
const fs = require('fs');
const app = express();
const cookieParser = require('cookie-parser');

app.listen(8004,function(){

})
app.use(cookieParser("dsfuiehiknsksdifjsodfjodsjf"))

app.use(bodyParser.urlencoded({}));

app.use('/resign',function(req,res){
   
    fs.readFile('./data.txt','utf8',function(err,data){
        if(err) throw err;
        let date = JSON.parse(data) 
        let json = req.body;
        if(date[json.user]){
            res.send('您的账号已被注册');
        }else{
         
            date[json.user] = json.pass;
            fs.writeFile('./data.txt',JSON.stringify(date),function(err){
                if(err) throw err;
                res.send('注册成功')
            })
        }
    })
})

app.use('/login',function(req,res){
    fs.readFile('./data.txt','utf8',function(err,data){
        if(err) throw err;
        let date = JSON.parse(data);
        let json = req.body;

        if(date[json.user] == json.pass){
            res.send('登陆成功')
        }else{
            res.send('账号密码错误')
        }


    })
})
app.use('/zidong',function(req,res){
var json=req.body
 req.secret="dsfuiehiknsksdifjsodfjodsjf"

fs.readFile('./data.txt','utf8',function(err,data){
    var date = JSON.parse(data)
   
    if (err) throw err
        if(date[json.user] == json.pass){
         res.cookie('user',json.user,{signed:true,maxAge:1000*60*5})
         res.cookie('pass',json.pass,{signed:true,maxAge:1000*60*5})
         res.send('登陆成功')
        }


})



})
app.use("/automatic",function(req,res){
var neihan=req.signedCookies

fs.readFile("./data.txt","utf8",function(err,data){
if (err) throw err
if(neihan.user==undefined){
    res.send('密码过期')   
}else{
    res.send('登陆成功')

}


})


})









app.use(static('./public'))
