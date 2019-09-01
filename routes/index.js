var express = require('express');
var router = express.Router();

router.get('/hello', function(req, res, next) {
  res.json({hello: 'world'}).header(202);
});

router.get('/apppage', function(req, res, next) {
  res.json({well: 'come back again yeah please one last time'}).header(202);
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
