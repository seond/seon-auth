var express = require('express');
var router = express.Router();

var User = require('../models').User;

router.post('/create', function(req, res, next) {
  User.register(req.body.user, function(err, user) {
    if(err) return next(err);
    res.send(user);
  });
});

module.exports = router;
