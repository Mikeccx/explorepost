var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'friendforum'
});

connection.connect();

var  sql = 'SELECT * FROM user';
//查
connection.query(sql,function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }
    // console.log('--------------------------SELECT----------------------------');
    // console.log(result);
    // console.log('------------------------------------------------------------\n\n');
    router.get('/', function(req, res, next) {
        console.log(result);
        return res.json(result);
    });
});
connection.end();
module.exports = router;   //暴露接口
