
var fs = require('fs')
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var app = express();
var formidable = require('formidable')
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


/*上传头像*/
router.post('/headphoto', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = 'public/images'
    form.parse(req, (err, fields, files) => {
        if(err) return next(err)
        let id = fields.id //用户名 用于修改用户头像路径
        let sql = 'UPDATE user set headphoto ='+ '\'http://148.70.128.231:3000/public/images/'+id+'.jpg\'' +' where userid ='+id
        let oldPath = files.file.path //获取文件路径 ~/public/images/<随机生成的文件名>.<扩展名>
        let imgname = files.file.name //前台上传时的文件名 也就是文件原本的名字
        let userImgname = imgname.replace(/[^.]+/, id) //把扩展名前的文件名给替换掉
        let newPath = 'public/images/'+ userImgname
        console.log(sql)
        fs.rename(oldPath,newPath,function(err){
            if(err){
                console.error("改名失败"+err);
            }
            connection.query(sql,function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send(false);
                    return ;
                }
                res.json({ code: 1, message: 'upload success' })
            });
        });
    })
})
/*获取用户个人信息*/
router.get('/',function (req, res) {
    let userid = req.query.id;
    // let sql = 'SELECT username,useremail,gender,userid from user WHERE userid  = ' + '\''+userid+'\''
    let sql = 'select user.*, ' +
        '(select count(*) from follow where fansid = '+userid+' ) focusnum,' +
        '(SELECT COUNT(*) from follow where followedid = '+userid+') fansnum,'+
        '(SELECT count(*) from post WHERE postauthorid = '+userid+') postnum,'+
        '(SELECT count(*) from reply WHERE floorerid='+userid+') replynum '+
        'from user where user.userid = '+userid
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        res.send(result)
    });
})
/*获取用户密码信息和头像性别*/
router.get('/getuserpw',function (req, res) {
    let userid = req.query.userid;
    // let sql = 'SELECT username,useremail,gender,userid from user WHERE userid  = ' + '\''+userid+'\''
    let sql = 'SELECT password,headphoto,gender from user where userid = '+ userid
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        res.send(result)
    });
})
/*修改性别*/
router.get('/changegender',function (req, res) {
    let userid = req.query.userid;
    let gender = req.query.gender;
    let sql = 'UPDATE USER SET gender = ' + '\''+gender +'\' '+ 'where userid ='+userid
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
/*获取帖子列表信息*/
router.get('/postlist',function (req, res) {
    let postauthorid = req.query.id;
    let sql = 'SELECT * from post WHERE postauthorid  = ' + '\''+postauthorid+'\''
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
/*获取收藏帖子列表信息*/
router.get('/getcollect',function (req, res) {
    let userid = req.query.id;
    let sql = 'SELECT post.postid,posttitle,posttime,clicknum,replynum,postsubject FROM post,collect WHERE collect.postid = post.postid and userid= ' + userid
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
/*获取关注列表信息*/
router.get('/follow',function (req, res) {
    let userid = req.query.id;
    // let sql = 'SELECT headphoto,username,COUNT(fansid = '+userid+') AS focusnum,COUNT(followedid = '+userid+') as fansnum FROM follow,user WHERE userid = fansid'
    let sql = 'SELECT user.* from user,follow where fansid ='+userid+' and followedid =userid'
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
/*是否关注*/
router.get('/isfollow',function (req, res) {
    let fansid = req.query.userid;
    let followedid = req.query.followedid;
    let sql = 'SELECT * FROM `follow` WHERE fansid = ' + fansid + ' and followedid = '+ followedid
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
/*关注*/
router.get('/befans',function (req, res) {
    let fansid = req.query.userid;
    let followedid = req.query.followedid;
    let followtime = req.query.followtime;
    let sql = 'INSERT INTO follow (followtime,fansid,followedid )'+
        ' VALUES '+
        '('+'\''+followtime+'\','+fansid+','+followedid+')'
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
/*取关注*/
router.get('/bepasser',function (req, res) {
    let fansid = req.query.userid;
    let followedid = req.query.followedid;
    let sql = 'DELETE FROM follow where fansid = ' + fansid + ' and ' + 'followedid = ' + followedid
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
/*是否收藏*/
router.get('/iscollect',function (req, res) {
    let postid = req.query.postid;
    let userid = req.query.userid;
    let sql = 'SELECT * FROM collect WHERE postid = ' + postid + ' and userid = '+ userid
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
/*收藏*/
router.get('/collect',function (req, res) {
    let postid = req.query.postid;
    let userid = req.query.userid;
    let collecttime = req.query.collecttime;
    let sql = 'INSERT INTO collect (collecttime,userid,postid )'+
        ' VALUES '+
        '('+'\''+collecttime+'\','+userid+','+postid+')'
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
/*取消收藏*/
router.get('/cancelcollect',function (req, res) {
    let postid = req.query.postid;
    let userid = req.query.userid;
    let sql = 'DELETE FROM collect where postid = ' + postid + ' and ' + 'userid = ' + userid
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
/*获取粉丝列表信息*/
router.get('/fans',function (req, res) {
    let userid = req.query.id;
    let sql = 'SELECT u.* from user u,follow f where f.fansid = u.userid and f.followedid = ' + userid
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
/*修改用户密码包括管理员重置密码*/
router.post('/alterpw', bodyParser.json(), function (req, res, next){
    let userid = req.body.userid;
    let password = req.body.password;
    let  sql ='UPDATE user set password ='+ '\''+password+'\''+' where userid = '+userid
    console.log(sql)
    // console.log(sql);
    connection.query(sql,function (err, result) {
        // result = JSON.stringify(result);
        // result = JSON.parse(result);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(false);
            return ;
        }
        res.send(result)
    });
})

module.exports = router;
