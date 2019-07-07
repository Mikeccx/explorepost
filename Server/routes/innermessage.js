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
/*获取站内信列表信息*/
router.get('/',function (req, res) {
    let userid = req.query.userid;
    let sql = 'SELECT * from innermessage WHERE userid  = ' + '\''+userid+'\''
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
/*已读标记*/
router.get('/read',function (req, res) {
    let innermailid = req.query.innermailid;
    let sql = 'UPDATE innermessage set isread = 1 where innermailid = ' + innermailid
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
/*删除站内信列表信息*/
router.get('/delete',function (req, res) {
    let innermailid = req.query.innermailid;
    let sql = 'DELETE from innermessage WHERE innermailid  = ' + innermailid
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
//返回站内公告
router.get('/announce',function (req, res) {
    let sql = 'SELECT content,announcetime from admin where adminid =1'
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
//发送站内公告
router.post('/announce',bodyParser.json(),function (req, res) {
    let content = req.body.content;
    let announcetime = req.body.announcetime;
    let sql = 'UPDATE admin set content = '+'\''+content+'\''+',announcetime='+'\''+announcetime+'\''+' where adminid = 1'
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
/* 管理员发送站内信*/
router.post('/',bodyParser.json(),function (req, res) {
    let userid = req.body.userid;
    let mailtitle = req.body.mailtitle;
    let content = req.body.content;
    let sendtime = req.body.sendtime;
    let sql = 'INSERT INTO innermessage (userid, mailtitle, content, sendtime) VALUES '+
        '('+userid+',\''+mailtitle+'\','+'\''+content+'\','+'\''+sendtime+'\')'
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
