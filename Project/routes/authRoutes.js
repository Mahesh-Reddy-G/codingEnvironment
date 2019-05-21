let router = require("express").Router(),
    User = require("../model/loginSchema.js");

router.get("/register", (req,res)=>{
	res.render('register');
});

router.post('/register', (req, res)=>{
	console.log("POST register api call data is "+
	 JSON.stringify(req.body));
	User.createUser(req.body, function(err, data){
		if(err){
			res.render("errRegister");
		}else{
			console.log("Successfully save the user data to the db "+ 
				JSON.stringify(data));
			res.redirect('/login');
		}
	});
});

module.exports = router;
