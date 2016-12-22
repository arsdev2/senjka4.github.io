var a;
var isDifficultSelect = false;
var isLoaded = false;
var timer  = 60000;
var startisclick = false;

var timer  = 60000;
function timeri(){
setInterval(function() {
 if(startisclick){
 timer = timer - 1000;
	document.getElementById("time").innerHTML = "Time left: " + timer /1000;
}
}, 1000);
}

isLoaded = true;
function startClick(){
		document.getElementById("start").remove();
startisclick = true;
timeri();
}

}
function init(){
	container = document.querySelector(".triggers");
	container.innerHTML = "";
	var count = 4;
	switch(window.location.hash.substr(1)){
		case "easy": count = 4; k(); break;
		case "normal": count = 6;k(); break;
		case "hard": count = 8;k(); break;
		case "veryhard": count = 16;k();break;
		default: isDifficultSelect = false;
	}
	var innerHTML = "";
	for(i=0;i<count;i++){
			
		innerHTML += '<span class="lamp l0" onclick="imgClick(this, event)" data-num="' + (Math.pow(2, count-i-1)) + '"></span>\n';

	
	container.innerHTML = innerHTML;
	a = rand(1, Math.pow(2, count));
	document.getElementById("number").innerHTML =  a;
	document.getElementById("now").innerHTML = 0;
	
}
}


function imgClick(el, ev){
	if(el.classList.contains("l1")){
		el.classList.remove("l1");
		el.classList.add("l0");
	}else{
		el.classList.remove("l0");
		el.classList.add("l1");
	}
	var els = document.querySelectorAll(".lamp");
	var s = "";
	for(i=0;i<els.length;i++){
		s += (els[i].classList.contains("l1")) - 0;
	}
	s = parseInt(s, 2);
	document.getElementById("now").innerHTML = s;
	if(s == a){
		setTimeout(function(){
			alert("В тебе все получилось!");
			init();
		}, 500);		
	}
}

function rand(min, max) {return Math.floor(Math.random() * (max - min)) + min;}