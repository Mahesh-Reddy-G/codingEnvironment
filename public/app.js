function pwa(){
var btn = document.getElementsByClassName("center-block")[0];
var box = document.getElementsByClassName("box")[0];
btn.addEventListener("click", buttonClick);
function buttonClick(){
	if(box.className == 'box'){
		box.setAttribute("class", "enlargeBox");
		btn.textContent = "show less";
	}else{
		box.className = 'box';
		btn.textContent = "show more";
	}
}	
if( "serviceWorker" in navigator){
	console.log("Browser supports service worker");
	navigator.serviceWorker.register("./sw.js").then(function(){
		console.log("SW registered");
	})
}else{
	console.log("Browser is not supporting the service worker");
}

}

window.onload = function(){
	pwa();
}