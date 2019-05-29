var express = require("express"),
app = express(),
port = 8080;

app.use(express.static(__dirname + "/public/"))

app.get("/", (req, res)=>{
	res.sendFile(__dirname + "/public/home.html");
});

app.listen(port, ()=>{
	console.log("App listening to the port "+ port);
})
