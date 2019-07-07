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
/*读取帖子列表homepage*/
router.get('/', function(req, res, next) {
    let postsubject = req.query.postsubject;
    let sql = 'SELECT postid,u1.username as postauthor,posttitle,posttime,lastreplytime,postcontent,clicknum,replynum,u2.username as lastreplyname from post,user u1,user u2 WHERE  poststate=1 and u1.userid = postauthorid and u2.userid = lastreplyid and postsubject = '+'\''+postsubject+'\''+
             'order by posttime ASC'
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send(result)
        }
    });
});
/*读取帖子列表按最后回复排序*/
router.get('/lastreplysort', function(req, res, next) {
    var waytoreply = req.query.waytoreply;
    var postsubject = req.query.postsubject;
    let sql = ''
    let desc = 'SELECT postid,u1.username as postauthor,posttitle,posttime,lastreplytime,postcontent,clicknum,replynum,u2.username as lastreplyname from post,user u1,user u2 WHERE  poststate=1 and u1.userid = postauthorid and u2.userid = lastreplyid and postsubject = '+'\''+postsubject+'\''+
        'ORDER BY lastreplytime DESC';
    let asc = 'SELECT postid,u1.username as postauthor,posttitle,posttime,lastreplytime,postcontent,clicknum,replynum,u2.username as lastreplyname from post,user u1,user u2 WHERE  poststate=1 and u1.userid = postauthorid and u2.userid = lastreplyid and postsubject = '+'\''+postsubject+'\''+
        'ORDER BY lastreplytime ASC';
    if(waytoreply == 'true') {
        sql = desc
    }
    else {
         sql = asc
    }
    // res.send('来了post')
    console.log(waytoreply)
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            sql = ''
            res.send(result)
        }
    });
});
/*读取帖子列表按发表时间排序*/
router.get('/pulishtimesort', function(req, res, next) {
    let waytopulish = req.query.waytopulish;
    let postsubject = req.query.postsubject;
    let sql = '';
    let desc = 'SELECT postid,u1.username as postauthor,posttitle,posttime,lastreplytime,postcontent,clicknum,replynum,u2.username as lastreplyname from post,user u1,user u2 WHERE  poststate=1 and u1.userid = postauthorid and u2.userid = lastreplyid and postsubject = '+'\''+postsubject+'\''+
        'ORDER BY posttime DESC';
    let asc = 'SELECT postid,u1.username as postauthor,posttitle,posttime,lastreplytime,postcontent,clicknum,replynum,u2.username as lastreplyname from post,user u1,user u2 WHERE  poststate=1 and u1.userid = postauthorid and u2.userid = lastreplyid and postsubject = '+'\''+postsubject+'\''+
        'ORDER BY posttime ASC';
    console.log(waytopulish)
    if(waytopulish == 'true')
        sql = desc
    else
        sql = asc

    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send(result)
        }
    });
});
/*返回所有帖子 帖子管理*/
router.get('/allpost', function(req, res, next) {
    let sql = 'SELECT postid,u1.username as postauthor,posttitle as value,posttime,lastreplytime,postcontent,clicknum,replynum,u2.username as lastreplyname from post,user u1,user u2 WHERE  poststate=1 and u1.userid = postauthorid and u2.userid = lastreplyid'
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send(result)
        }
    });
});
/*最后回复 post信息*/
router.get('/lastreply', function(req, res, next) {
    let postid = req.query.postid;
    let lastreplytime = req.query.lastreplytime;
    let lastreplyid = req.query.lastreplyid;
    let sql = 'UPDATE POST SET lastreplyid = ' +  lastreplyid + ', lastreplytime = ' + '\''+ lastreplytime + '\' where postid = ' + postid
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send(result)
        }
    });
});
/*搜索*/
router.get('/search', function(req, res, next) {
    let wd = req.query.wd;
    let sql = 'SELECT postid,username as postauthor,posttitle,posttime,lastreplytime,postcontent from post,user WHERE  poststate=1 and userid = postauthorid and posttitle LIKE '+ '\'%' + wd +'%\''
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send(result)
        }
    });
});
/*根据id查询相关帖子信息*/
router.get('/postid', function(req, res, next) {
    // console.log(req)
    let postid = req.query.id;
    let sql = 'SELECT post.*,headphoto,username as postauthor from post,user WHERE postauthorid = userid and postid = '+postid
    console.log(req.query.id)
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send(result)
        }
    });
});
/*返回回帖信息*/
router.get('/getreply', function(req, res, next) {
    // console.log(req)
    let postid = req.query.postid;
    // let sql = 'SELECT reply.*,username as replyername,headphoto FROM reply,user WHERE  userid = floorerid and postid = '+postid
    let sql = 'SELECT reply.*,username as replyername,headphoto FROM reply,user WHERE  userid = floorerid and postid = '+postid + ' ORDER BY replytime ASC'
    // console.log(req.query.id)
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send(result)
        }
    });
});
/*返回层中回帖信息*/
router.get('/getfloorreply', function(req, res, next) {
    // console.log(req)
    let replyfloor = req.query.replyfloor;
    let postid = req.query.postid;
    let sql = 'SELECT guest.*,u1.username as floorername,u2.username as recivername,u3.username as guestername from user u1,user u2,user u3,guest WHERE floorerid = u1.userid and reciverid = u2.userid and guesterid = u3.userid and replyfloor='+replyfloor + ' and postid= '+ postid + ' ORDER BY replytime ASC'
    console.log(req.query.id)
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send(result)
        }
    });
});
/*发表新帖*/
router.post('/postnew', bodyParser.json(), function(req, res, next) {
    let posttitle = req.body.posttitle;
    console.log(posttitle)
    let postsubject = req.body.postsubject;
    let postcontent = req.body.postcontent;
    let posttime = req.body.posttime;
    let postauthorid = req.body.postauthorid;
    let lastreplyid = req.body.postauthorid;
    let lastreplytime = req.body.posttime;
    let  sql ='INSERT INTO post (postsubject, posttitle, posttime, postcontent, postauthorid,lastreplyid,lastreplytime) ' +
        ' VALUES ' +
        '('+'\''+postsubject+'\','+'\''+posttitle+'\','+'\''+posttime+'\''+','+'\''+
    postcontent+'\','+postauthorid+','+lastreplyid+',\''+lastreplytime+'\''+')'
    // // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send('来了？')
        }
    });
});
/*回复楼主*/
router.post('/reply', bodyParser.json(), function(req, res, next) {
    let content = req.body.content;
    let postid = req.body.postid;
    let replytime = req.body.replytime;
    let floorerid = req.body.floorerid;
    let replyfloor = req.body.replyfloor
    let  sql ='INSERT INTO reply (content, postid, replytime, floorerid, replyfloor) ' +
        ' VALUES ' +
        '('+'\''+content+'\','+postid+',\''+replytime+'\','+ floorerid + ','+ replyfloor +')'
    // // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send('来了？')
        }
    });
});
/*回复层主*/
router.post('/replycz', bodyParser.json(), function(req, res, next) {
    let postid = req.body.postid;
    let replyfloor = req.body.replyfloor
    let content = req.body.content;
    let guesterid = req.body.guesterid;
    let floorerid = req.body.floorerid;
    let reciverid = req.body.reciverid
    let replytime = req.body.replytime;
    let  sql ='INSERT INTO guest (postid,replyfloor,content, guesterid,floorerid,reciverid,replytime) ' +
        ' VALUES ' +
        '('+postid+','+replyfloor+','+'\''+content+'\','+guesterid+','+floorerid+','+reciverid+','+ '\''+replytime+'\''+')'
    // // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send('来了？')
        }
    });
});
/*点击数加1*/
router.get('/clicknum', function(req, res, next) {
    // console.log(req)
    let postid = req.query.postid;
    let sql = 'update post set clicknum = clicknum+1 WHERE postid = ' + '\''+postid+'\''
    console.log(req.query.id)
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send('success')
        }
    });
});
/*回复数加1*/
router.get('/replynum', function(req, res, next) {
    // console.log(req)
    let postid = req.query.postid;
    let sql = 'update post set replynum = replynum+1 WHERE postid = ' + '\''+postid+'\''
    console.log(req.query.id)
    // res.send('来了post')
    console.log(sql)
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        else{
            res.send('success')
        }
    });
});
module.exports = router;   //暴露接口
