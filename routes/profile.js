var express = require('express');
var router = express.Router();

var User = require('../models').User;

var profileRouter = (OAuthServer) => {
    router.get('/me', OAuthServer.authorise(), function(req, res, next) {
        try {
            User.findOne({_id: req.user.id}).then((user) => {
                res.status(200).json({
                    id: user._id,
                    name: user.display_name,
                    email: user.email
                });
            });
        }
        catch(e) {
            res.status(404);
        }
    });

    return router;
};

module.exports = profileRouter;
