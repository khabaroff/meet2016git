// $(document).foundation();
 
// $(window).fancy_scroll({
// 	      animation: "bounce",
// 	  		bounceDistance: 100,
// 	  		animDuration: "0.4s",
// 	  		animEasing: "cubic-bezier(0.175, 0.885, 0.320, 1)",
// });


var particles = 10; // частицы
var steps = 10;
var coordinatesX = new Array;
var coordinatesY = new Array;
var spin = new Array;
var skew = new Array;

var boxWithParticle = new Array;
var allTime = 1000;

var gravity = 20;

 
var w = window.innerWidth;
var h = window.innerHeight;
 

var masterShapes = ["fa fa-one", "fa fa-two", "fa fa-three", "fa fa-four", "fa fa-five", "fa fa-six", "fa fa-seven"];
var masterColors = ["purple", "yellow", "green"]


for (var i = 0; i < particles; i++) {

var box = document.createElement('span'); 	
box.className = masterShapes[Math.floor(Math.random()*7)];
box.className = box.className + " " + masterColors[Math.floor(Math.random()*3)];
box.style.fontSize = Math.floor(Math.random()*120) + 25 + "px";

box.style.left = Math.floor(Math.random()*w/2 + w/4) + "px";
box.style.top = h/2 + "px";
  
boxWithParticle[i] = box;
 



document.body.appendChild(box);

}


function firePlain(){ 


for (var j = 0; j < particles; j++) {

	var boxWithParticle = document.getElementsByClassName("fa")[j];


	boxWithParticle.style.left = Math.floor(Math.random()*w*3 - w) + "px";
	boxWithParticle.style.top = Math.floor(Math.random()*h*3 - h) + "px";


	if (boxWithParticle.className.indexOf('visible') < 0) {
 
	boxWithParticle.className = boxWithParticle.className + " visible";

		}

	var angle = Math.floor(Math.random()*200-400);


boxWithParticle.style.webkitTransform = "rotate("+angle+"deg)";
boxWithParticle.style.MozTransform = "rotate("+angle+"deg)";
boxWithParticle.style.msTransform = "rotate("+angle+"deg)";
boxWithParticle.style.OTransform = "rotate("+angle+"deg)";
boxWithParticle.style.transform = "rotate("+angle+"deg)";
 

}
}



function fireSpiralPrepare(){ 

for (var k = 0; k < particles; k++) // по частицам
{
	
var a = Math.floor(Math.random()*5) + 5;
var b = Math.floor(Math.random()*2)*Math.PI/9;
spin[k] = Math.floor(Math.random()*2000)+45;
skew[k] = Math.floor(Math.random()*2000)+45;
	
for (var l = 0; l < steps; l++) // по эволюции	
{

x = a * Math.cos(b*(l+1));
y = a * Math.sin(b*(l+1));


coordinatesX[k*steps+l] = -x*50+50;
coordinatesY[k*steps+l] = -y*50+50 + l*gravity;


}
  

} } 

 
 

fireSpiralPrepare();

var lay = 0;

function fireSpiral() {



 


for (var k = 0; k < particles; k++) // по частицам
{

var ee = coordinatesX[lay+ k * steps]
var  rr= coordinatesY[lay+ k * steps]

console.log(ee +" "+ rr);


boxWithParticle[k].style.webkitTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skew[k]+"deg)";
boxWithParticle[k].style.MozTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skew[k]+"deg)";
boxWithParticle[k].style.msTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skew[k]+"deg)";
boxWithParticle[k].style.OTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skew[k]+"deg)";
boxWithParticle[k].style.transform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skew[k]+"deg)";
 

 	if (boxWithParticle[k].className.indexOf('visible') < 0) {
 
	boxWithParticle[k].className = boxWithParticle[k].className + " visible";

		}

} 

lay = lay + 1
 
//console.log(lay)
}



var intervalID = setInterval(function time() {
		
		fireSpiral();
}, allTime/steps);


setInterval(function(){
clearInterval(intervalID);
},allTime)
