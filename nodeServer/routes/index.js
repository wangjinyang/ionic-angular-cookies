var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var now = new Date();
  var nextYear=new Date(now.setFullYear(now.getFullYear()+1));
  //you can change the cookie key and value by your self here
  res.cookie('cookiesTest', 'set cookies success,your cookies can be set by server', { expires: nextYear, httpOnly: true });
  res.render('index', { title: 'Express' });
});
router.get('/setCookies', function(req, res, next) {
  var now = new Date();
  var nextYear=new Date(now.setFullYear(now.getFullYear()+1));
  //you can change the cookie key and value by your self here
  res.cookie('cookiesTest', 'set cookies success,your cookies can be set by server', { expires: nextYear, httpOnly: true });
  res.status(200)
  res.end('SET COOKIES SUCCESS')
});

router.get('/getCookies', function(req, res, next) {
  res.status(200)
  res.end(JSON.stringify(req.cookies))
});

module.exports = router;
