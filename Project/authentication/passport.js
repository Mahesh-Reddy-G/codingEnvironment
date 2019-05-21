/* passport related code comes here */
let LocalStrategy = require('passport-local').Strategy,	
	User = require("../model/loginSchema");

function setupAuth(passport){
	passport.use(new LocalStrategy(
	function (username, password, done) {
		console.log("entering into the LocalStrategy");
		console.log("username is "+username+" password is "+password);
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				console.log("result of isMatch is "+ isMatch);
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	console.log("serializeUser " + user);
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	console.log("deserializeUser "+ id);
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

}

module.exports.init = setupAuth;

/* passport related code ends here */
