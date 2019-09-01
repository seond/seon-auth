var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');

var configAuth = require('./auth');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, {
				_id: user._id,
				email: user.google.email,
				name: user.google.name
			});
		});
	});

	passport.use(new LocalStrategy({
			usernameField: 'email',
			session: false
		},
		function(email, password, done) {
			User.authenticate(email, password, function(err, user) {
				if(err) { return done(err); }

				return done(null, user);
			});
		}
	));

	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {

	  	process.nextTick(function(){
	    		User.findOne({'google.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user) {
	    				return done(null, user);
	    			}
	    			else {
	    				var newUser = new User(); // user local id is not added manually. it's taken from mongo object id,
	    				newUser.google.id = profile.id;
                        newUser.google.token = accessToken;
                        newUser.email = profile.emails[0].value;
                        newUser.display_name = profile.displayName;
                        
                        console.log("newuser**");
                        console.log(newUser);

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				});
	    			}
	    		});
	    	});
	  }

	));
};
