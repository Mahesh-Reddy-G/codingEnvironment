/* Express */
var express = require("express");
var app = express();

/* Getting the static files from public folder */
app.use(express.static(__dirname + '/public'));

/* template engine .. need to do only npm install ejs */
app.set("view engine", "ejs");

/* Make sure you should include bodyParser before routes */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

/* setup routes */
var auth = require("./routes/authRoutes");
app.use("/auth", auth);


/* connect to mongodb */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/codingEnvironment", {useNewUrlParser: true});
mongoose.connection.once('open',function(){
 console.log("Successfully connected to the mongodb database");
}).on("error",function(error){
 console.log("Error on while connecting into the mongodb database");
});


app.get("/login", (req,res)=>{
	res.sendFile(__dirname + '/public/login-page.html');
});

/* passport related code comes here */

var passport = require("passport"),
    session = require("express-session");
	app.use(session(
				{ secret: "loginapp",  
				  resave: false, 
				  saveUninitialized: false,
				  cookie: { maxAge: 6000000 }
				}));
	app.use(passport.initialize());
	app.use(passport.session());

var passportsetup = require("./authentication/passport");
passportsetup.init(passport);

app.post("/login", passport.authenticate('local', {
	'failureRedirect': '/login',
	'session': true
}), (req, res)=>{
	console.log("Successfully authenticated using passport "+ 
		JSON.stringify(req.user));
	res.redirect("/home");
});

app.get("/logout", (req, res)=>{
	req.logout();
    res.redirect('/login');
});

app.get("/home", (req, res)=>{
	if(req.user){
		res.render('home', {userData : req.user});
	}else{
		res.redirect("/login");
	}
});

/* passport related code comes here */


/* Here order should be most important the below piece of code
should be placed once after all the api calls are done 
 If any api call didn't matches (like we have given wrong api) 
then we are using below middleware to display message on browser */
app.use(function(req,res){
	 res.render("404", { apiCall : req.url});
});

/* Port */
var port = 8080;
app.listen(port, ()=>{
	console.log("Server listening on port "+ port);
});