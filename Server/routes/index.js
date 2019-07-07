var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('来了index')
});
router.get('/dd', function(req, res, next) {
  // res.render('db', { title: 'Express' });
  res.send('来了index/dd')
});

module.exports = router;

//之前用的

