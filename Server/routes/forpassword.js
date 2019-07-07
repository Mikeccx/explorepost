var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
//在原有的基础上加上下面代码即可
app.use(bodyParser.json())
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'friendforum'
});
connection.connect();
var nodemailer = require("nodemailer")
var transport = nodemailer.createTransport({
    host: "smtp.163.com",
    secureConnection: true, //是否使用安全连接，对https协议的
    port: 465,
    auth: {
        user: "mrexplore@163.com",
        pass: "caoxing123"
    }
})
/*发送邮件*/
var sendMail = function (to,html) {
    transport.sendMail({
        from: "mrexplore@163.com",
        to: to,
        subject: "Mrexplore论坛找回密码",
        html: html

    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功')
    });
}
var scode;
var email;
router.post('/', bodyParser.json(), function (req, res, next){
    var code="";
    while(code.length<5){
        code+=Math.floor(Math.random()*10);
    }
    console.log(code)
    scode = code.concat();
    let useremail = req.body.email;
    email = useremail;
    var html = "<h1 style='text-align: center'>找回密码系统，您本次的邮箱验证码为："+code+"</h1>"
    sendMail(useremail,html)
    res.send('成功发送')
})
router.post('/tochange', bodyParser.json(), function (req, res, next){
    let vcode = req.body.vcode;
 if (scode == vcode){      //相等 返回1 验证成功
        res.send('1')
    }
    else res.send('2')      //不相等 返回2 ，
})
router.post('/toreset', bodyParser.json(), function (req, res, next){
    let password = req.body.password;
    let  sql ='UPDATE user SET password = '+'\''+password+ '\'' + 'where useremail = ' + '\''+email+'\'';
    console.log(sql);
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else
        {res.send(true)}
    });
})
module.exports = router;
