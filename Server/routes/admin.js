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
/*获取用户个人信息*/
router.get('/',function (req, res) {
    let sql = 'SELECT * from user where userstate=1'
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
/*获取帖子信息*/
router.get('/postinfo',function (req, res) {
    let sql = 'SELECT post.*,username as postauthor from user,post WHERE postauthorid=userid and poststate=1'
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
/*用户改变状态进入待删除状态*/
router.get('/deleteuser',function (req, res) {
    let userid = req.query.userid;
    let sql = 'UPDATE user set userstate = 0 where userid =' + userid
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
/*删除用户及一切相关信息*/
router.get('/abdeleteuser',function (req, res) {
    let userid = req.query.userid;
    let sql = 'DELETE from user where userid =' + userid +';'+'DELETE from collect '
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
/*帖子改变状态进入待删除状态*/
router.get('/deletepost',function (req, res) {
    let postid = req.query.postid;
    let sql = 'UPDATE post set poststate = 0 where postid =' + postid
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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('来了get/submit')
});
// 用户登录提交
router.post('/', bodyParser.json(), function (req, res, next){
    let adminname = req.body.adminname;
    let password = req.body.password;
    let  sql ='SELECT * FROM admin where adminname = '+'\''+adminname+ '\'';
    // console.log(sql);
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        if (result=='') res.send(false);
        else if(result[0].password ===password) res.send(result[0]);
        else res.send(false);
    });
})

module.exports = router;
