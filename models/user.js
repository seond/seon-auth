var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ValidationError = require('../errors').ValidationError;

var OAuthUsersSchema = new Schema({
  local: {
    hashed_password: String,
    password_reset_token: String,
    reset_token_expires: Date
  },
  google: {
    id: String,
    token: String
  },
  email: String,
  display_name: String
});

OAuthUsersSchema.static('getUser', function(email, password, cb) {
  OAuthUsersModel.authenticate(email, password, function(err, user) {
    if (err || !user) return cb(err);
    cb(null, user.email);
  });
});

OAuthUsersSchema.static('authenticate', function(email, password, cb) {
  this.findOne({ email: email }, function(err, user) {
    if (err || !user) return cb(err);
    cb(null, bcrypt.compareSync(password, user.local.hashed_password) ? user : null);
  });
});

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

OAuthUsersSchema.static('register', function(fields, cb) {
  var user;

  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;

  user = new OAuthUsersModel(fields);
  user.save(cb);
});

mongoose.model('user', OAuthUsersSchema);

var OAuthUsersModel = mongoose.model('user');
module.exports = OAuthUsersModel;
