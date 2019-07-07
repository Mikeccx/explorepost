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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('来了get/submit')
});
connection.connect();
// 用户登录提交
router.post('/', bodyParser.json(), function (req, res, next){
    let usereamil = req.body.email;
    let password = req.body.password;
    let  sql ='SELECT * FROM user where useremail = '+'\''+usereamil+ '\'' + 'and userstate = 1';
    console.log(password)
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
        else if(result[0].password === password) res.send(result[0]);
        else res.send(false);
        // else
        //     res.send(false)
        //     // connection.end();
        // if(req.body.password == result[0].password ) res.send(result)
    });
})

module.exports = router;
