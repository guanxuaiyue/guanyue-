var http=require('http')
var  queryString = require('querystring');
var fs=require('fs')
    http.createServer(function (req,res) {
        res.setHeader('Access-Control-Allow-Origin','*');
        var  str=''
      req.on('data',function (data) {
                str+=data ;
      })
         req.on('end',function (err) {
                  if (err) throw  err
           var json=queryString.parse(str)
        fs.readFile('./data.txt','utf8',function (err,data) {
            if (err) throw  err
            var json1= JSON.parse(data)
              if (json1[json.user]){
                            res.write('账户已注册')
                          res.end()
              }else {
                  json1[json.user] = json.pass;  //json对象赋值{"xiebin":"123456"}
                  fs.writeFile('./data.txt',JSON.stringify(json1),function(err){
                     if (err) throw  err
                      res.write('注册成功')
                    res.end()
                 })

              }

        })

         })

    }).listen(8000)

http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var str = '';
    req.on('data',function(data){
        str += data;
    })
    req.on('end',function(err){
        if(err) throw err;
        var  json = queryString.parse(str);
        fs.readFile('./data.txt','utf8',function(err,data){
            if(err) throw err;
           var  json1 = JSON.parse(data);
            if(json1[json.user] == json.pass){
                res.write('登陆成功');
                res.end();
            }else{
                res.write('账号密码错误');
                res.end();
            }
        })
    })
}).listen(8002)


http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var str=""
    req.on("data",function(date){
        str+=date
    })
    req.on('end',function(err){
        if(err) throw err;
        var json=queryString.parse(str)
        console.log(json)
        fs.writeFile('./wenzhang.txt',json.user+json.pass,function(err){
            if (err) throw err;
        })
        res.write(json.user+json.pass)
        res.end()
})
}).listen(8004)