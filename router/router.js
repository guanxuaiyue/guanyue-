var express=require('express');
var router=express.Router();
var bodyparser = require('body-parser')
router.use(bodyparser.urlencoded({}))
var mysql=require('mysql');
var pool=mysql.createPool({
host:'localhost',
user:'root',
password:'123456',
database:'user',
port:3306

})



//注册
router.use('/zc',function(req,res){
	var user=req.body.user;
	var pass=req.body.pass;
	console.log(req.body)
pool.getConnection(function(err,connection){
	if (err) throw err

connection.query(`SELECT * FROM user WHERE user='${user}' AND pass='${pass}'`,function(err,rows){
if (err)throw err
if (rows.length==0) {
connection.query(`INSERT INTO user (user,pass) VALUES ('${user}','${pass}')`,function(err,rows){
if (err) throw err
connection.query('SELECT * FROM user',function(err,rows){
if (err) throw err
res.send('注册成功')
connection.release();
})
})	
}
else{

res.send('用户名已注册')
connection.release();
}
	

})
})
})
router.use('/login',function(req,res){
	var user=req.body.user;
	var pass=req.body.pass
pool.getConnection(function(err,connection){
if (err) throw err
connection.query(`SELECT * FROM user WHERE user='${user}'AND pass='${pass}'`,function(err,rows){
if (err) throw err
if(rows.length==0){
res.send('登录失败')
connection.release();

}else{
res.send('登录成功')
connection.release();



}
})


})





})

















module.exports=router