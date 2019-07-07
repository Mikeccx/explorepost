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
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.send('来了get/submit')
// });
connection.connect();
// 用户注册
router.post('/', bodyParser.json(), function (req, res, next){
    let useremail = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let registertime = req.body.registertime
    let  sql ='INSERT INTO user (useremail, username, password, registertime) ' +
        ' VALUES ' +
        '('+'\''+useremail+'\','+'\''+username+'\','+'\''+password+'\','+'\''+registertime+'\''+')'
    console.log(sql);
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send('邮箱或账户已存在');
            return false;
        }
        else {
            console.log(result)
            res.send(result)
        }
    });
})
// 用户注册完毕后返回用户的个人信息
router.get('/',function (req, res) {
    let userid = req.query.userid
    let sql = 'SELECT * from user where userid = ' + userid
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        res.send(result)
    });
})
// 是否重复
router.get('/isrepeat',function (req, res) {
    let useremail = req.query.useremail;
    let username = req.query.username;
    let sql = 'SELECT * from user where useremail = ' +'\''+ useremail +'\''+ ' or username = ' + '\''+username+'\''
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        res.send(result)
    });
})

module.exports = router;
