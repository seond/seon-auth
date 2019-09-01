var express = require('express');
var router = express.Router();

var authRouter = (OAuthServer, passport) => {
    router.get('/world', function(req, res, next) {
        res.json({world: 'hello'}).header(202);
    });
    
    router.all('/token', OAuthServer.grant());
    
    router.get('/authorise', isLoggedIn, function(req, res, next) {
        res.render('authorise', {
          client_id: req.query.client_id,
          redirect_uri: req.query.redirect_uri
        });
    });

    router.post('/authorise', isLoggedIn, OAuthServer.authCodeGrant(function(req, next) {
        // The first param should to indicate an error
        // The second param should a bool to indicate if the user did authorise the app
        // The third param should for the user/uid (only used for passing to saveAuthCode)
        next(null, req.body.allow === 'yes', req.user._id, null);
    }));

    // Passport Routes

    router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/hello' }), function(req, res) {
        var redirectTo = req.flash('redirectTo')[0];
		res.redirect(redirectTo ? '/auth/' + redirectTo : '404');
	});

    router.post('/login', passport.authenticate('local'), function(req, res) {
        console.log('logged in successfully');
        console.log(req.user);
        var redirectTo = req.flash('redirectTo')[0];
		res.redirect(redirectTo ? '/auth/' + redirectTo : '/404');
    });

    return router;
};

module.exports = authRouter;


// Helper functions

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('redirectTo', req.url);
	res.redirect('/login');
}
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('redirectTo', req.url);
	res.redirect('/login');
}
