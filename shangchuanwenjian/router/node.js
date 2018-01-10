var express=require('express');
var router=express.Router();
var multer=require('multer');
var path=require('path')
var fs=require('fs');
var bodyparser=require('body-parser');
var mysql=require('mysql');
router.use(bodyparser.urlencoded({}))
var pool=mysql.createPool({
host:'localhost',
user:'root',
password:'123456',
database:'list',
port:3306



})



router.use(multer({dest:'./pubice'}).any())
router.use('/file',function(req,res){
var newName=path.parse(req.files[0].originalname).ext
fs.rename(req.files[0].path,req.files[0].path+newName,function(err){
if (err) throw err
})
var src=(req.files[0].path+newName).substring(7)
pool.getConnection(function(err,connection){
	
if (err) throw err
connection.query(`INSERT INTO list (img) VALUES ('${src}')`,function(err,rows){
if (err) throw err
connection.query('SELECT * FROM list',function(err,rows){
if (err) throw err
	res.send(rows)
})
})
})
})

router.use('/list',function(req,res){
	pool.getConnection(function(err,connection){
		if(err) throw err;
		connection.query('SELECT * FROM list',function(err,rows){
			if(err) throw err;
			res.send(rows);
			connection.release();
		})
	})
})


router.use('/delete',function(req,res){
	pool.getConnection(function(err,connection){
		if(err) throw err;
		connection.query(`DELETE FROM list WHERE id = ${req.body.id} `,function(err,rows){
			if(err) throw err;
			res.send(rows);
			connection.release();
		})
	})
})


/*router.use('/update',function(req,res){
	pool.getConnection(function(err,connection){
		if(err) throw err;
		connection.query(`UPDATE list SET user='${req.body.user}',pass='${req.body.pass}' WHERE id = ${req.body.id}`,function(err,rows){
			if(err) throw err;
			res.send(rows);
			connection.release();
		})
	})
})*/





module.exports=router