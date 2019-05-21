var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var user = new Schema({
	username: String,
	email: {
		type: String, 
        unique: true
	},
	password: String,
	confirmpassword: String
});

var User = mongoose.model("User", user);

module.exports.comparePassword = function(candidatePassword, hash, callback){
	console.log("comparePassword funct call candidatePassword is "+ 
		candidatePassword + " and hash is "+hash);
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.getUserByUsername = function(username, callback){
	console.log("getUserByUsername funct call username is "+
		username);
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.createUser = function(userData, callback){
	
	var newuser = new User();
	newuser.email = userData.email;
	newuser.username = userData.username;
	newuser.confirmpassword = userData.confirmpassword;

	bcrypt.hash(userData.password, 10, function(err, hash) {
 	    newuser.password = hash;   
		newuser.save(callback);
	});

}
