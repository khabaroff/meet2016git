// $(document).foundation();
 
// $(window).fancy_scroll({
// 	      animation: "bounce",
// 	  		bounceDistance: 100,
// 	  		animDuration: "0.4s",
// 	  		animEasing: "cubic-bezier(0.175, 0.885, 0.320, 1)",
// });


var particles = 35; // частицы
var steps = 40; // шаги анимации
var allTime = 2000; // время полета

var w = window.innerWidth;
var h = window.innerHeight;

var gravity = h/30; // гравитация

var coordinatesX = new Array;
var coordinatesY = new Array;
var spin = new Array;
var skewX = new Array;
var skewY = new Array;
var boxNew = new Array;
var again = 1;

$( window ).resize(function() {
  w = window.innerWidth;
  h = window.innerHeight;
  //console.log(h)
  relocate()
});




var masterShapes = ["fa fa-one", "fa fa-two", "fa fa-three", "fa fa-four", "fa fa-five", "fa fa-six", "fa fa-seven"];
var masterColors = ["purple", "yellow", "green"]


// создаем частицы внизу страницы
function createParticles() {

for (var i = 0; i < particles; i++) {

var box = document.createElement('span'); 	
box.className = masterShapes[Math.floor(Math.random()*7)];
box.className = box.className + " " + masterColors[Math.floor(Math.random()*3)];
box.style.fontSize = Math.floor(Math.random()*100) + 25 + "px";
box.style.left = Math.floor(Math.random()*w/10 + w/2 - w/20) + "px";
box.style.top = h + 100 + "px";
boxNew[i] = box; 
document.body.appendChild(box);
}
}


function relocate()  {

for (var r = 0; r < particles; r++) {

boxNew[r].style.webkitTransform =  "none";
boxNew[r].style.MozTransform =  "none";
boxNew[r].style.msTransform =  "none";
boxNew[r].style.OTransform =  "none";
boxNew[r].style.transform =  "none";

boxNew[r].style.left = Math.floor(Math.random()*w/2  + w/4) + "px";
boxNew[r].style.top = h + 100 + "px"; 

boxNew[r].style.animationDelay = 0.1*allTime + "ms" ;
boxNew[r].style.transition = "all 1000ms cubic-bezier(0.175, 0.460, 0.380, 1.010)";
boxNew[r].style.opacity = 0;
//console.log("relocated" + r)
}

lay = 0;

}

// запуск

function fireGoToSpace() {



  for (var st = 0; st < particles; st++)  
{

st1 = Math.floor(Math.random()*w);
st2 = Math.floor(Math.random()*h*7/8-100);

boxNew[st].style.transition = "all "+allTime/2.5+"ms cubic-bezier(0.175, 0.460, 0.380, 1.010)";
boxNew[st].style.left = st1 + "px";
boxNew[st].style.top = st2 + "px";
boxNew[st].style.opacity = 1;

// boxNew[st].style.webkitTransform =  "translate(" + st1 + "px, " - st2 - h + "px)";
// boxNew[st].style.MozTransform =  "translate(" + st1 + "px, " - st2 - h + "px)";
// boxNew[st].style.msTransform =  "translate(" + st1 + "px, " - st2 - h + "px)";
// boxNew[st].style.OTransform =  "translate(" + st1 + "px, " - st2 - h + "px)";
// boxNew[st].style.transform =  "translate(" + st1 + "px, " - st2 - h + "px)";


} 

}

// готовим координаты
function fireSpiralPrepare(){ 

for (var v = 0; v < particles; v++) // по частицам
{
	
var a = Math.random()*10 + 5;
var b = Math.random()*20*Math.PI/3;
var randomGravity = gravity + Math.random()*1;
var randomX = Math.random()*20;
var randomY = Math.random()*20;

spin[v] = Math.floor(Math.random()*5000)-2000;
skewX[v] = Math.floor(Math.random()*5000)-2000;
skewY[v] = Math.floor(Math.random()*5000)-2000;

for (var l = 0; l < steps; l++) // по эволюции	
{

x = a * Math.cos(b*(l+1));
y = Math.floor(a * Math.sin(b*(l+1)));

coordinatesX[v*steps+l] = -x*randomX;
coordinatesY[v*steps+l] = -y*randomY + l*randomGravity;



}
  

} } 

 

var lay = 0;

function fireSpiral() {
 
for (var k = 0; k < particles; k++) // по частицам
{
 
boxNew[k].style.transition = "all " + allTime*1.2 + "ms cubic-bezier(0.175, 0.460, 0.380, 1.010)";
boxNew[k].style.webkitTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
boxNew[k].style.MozTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
boxNew[k].style.msTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
boxNew[k].style.OTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
boxNew[k].style.transform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";

} 

lay = lay + 1
 
//console.log(lay)
}
 
createParticles()
fireSpiralPrepare();
  

function partA() {
   
 fireGoToSpace();

  setTimeout(partB,allTime/6);

}

function partB() {
  
  var interval = setInterval(function() {
	fireSpiral();
}, allTime/steps);


setInterval(function() {clearInterval(interval);
}, allTime)

again=0;


setTimeout(partC,allTime*7/6);
}
 

function partC() {
relocate()
console.log("Again?")
again=1;
 
}


 

$( "body" ).on("tap",function() {
 
	if (again) {
 

		relocate()
 		 partA();
  }

});
 

 