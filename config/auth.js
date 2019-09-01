var env = process.env.ENVIRONMENT_TYPE || "DEV";

var googleAuth = {
	DEV: {
		'clientID': '493402799291-hfjdg1ggio2t9edul8auv03e5aism50c.apps.googleusercontent.com',
		'clientSecret': 'MujWSA5fYa92WB3Kbc6Teh22',
		'callbackURL': 'http://shopod-api.com:7000/auth/google/callback'
	},
	DEV_ONLINE: {
		'clientID': '493402799291-c6083giltrrr05m2obpdcs4lldtl4h8m.apps.googleusercontent.com',
		'clientSecret': 'grGJ5_17Tex9GFxXNYVUiaew',
		'callbackURL': 'http://shopodauth.azurewebsites.net/auth/google/callback'
	}
};


module.exports = {
    'googleAuth': googleAuth[env],
	'facebookAuth': {
		'clientID': 'enter client id here',
		'clientSecret': 'enter client secret here',
		'callbackURL': 'enter callback here'
	}
};
