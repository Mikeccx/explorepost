var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入cors 跨域
var cors = require('cors');
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
var app = express();


//配置cors
// app.use(cors({
//     origin:['http://localhost:8080'],
//     method:['GET','POST'],
// }));
// app.all("*",(req,res,next) => {
//     res.header("Access-Control-Allow-Credentials","true");
//     res.header("Access-Control-Allow-Origin",req.headers.origin);
//     res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers","Content-Type,username");
//     next();
// })



// 添加
var usersb =require('./routes/usersubmit');           //引入
var dbr =require('./routes/db');           //引入
var index =require('./routes/index');           //引入
var signup =require('./routes/registrastion');           //引入
var forpassword =require('./routes/forpassword');           //引入
var post =require('./routes/post');           //引入
var userinfo =require('./routes/userinfo');           //引入
var admin =require('./routes/admin');           //引入
var innermessage =require('./routes/innermessage');           //引入
app.use('/usersubmit',usersb);
app.use('/db',dbr);
app.use('/index',index);
app.use('/registrastion',signup);
app.use('/forpassword',forpassword);
app.use('/post',post);
app.use('/userinfo',userinfo);
app.use('/admin',admin);
app.use('/innermessage',innermessage);
//引入requestbody 解析
app.use('/public',express.static('public')); //图片设置为静态




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;   //暴露接口
