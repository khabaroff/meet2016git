var particles = 30; // частицы
var steps = 40; // шаги анимации
var allTime = 2000; // время полета

var w = window.innerWidth;
var h = window.innerHeight;

var gravity = Math.floor(h/30); // гравитация

var coordinatesX = [];
var coordinatesY = [];

var boxWithParticle = [];
var parentBoxWithParticle = [];

var spin = [];
var skewX = [];
var skewY = [];
var again = 1;

var lay = 1

var masterShapes = ["fa fa-one", "fa fa-two", "fa fa-three", "fa fa-four", "fa fa-five", "fa fa-six", "fa fa-seven"];
var masterColors = ["purple", "yellow", "green"];


$( window ).resize(function() {
    w = window.innerWidth;
    h = window.innerHeight;
    fadeAndRelocate(2000);
});


// создаем частицы внизу страницы ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createParticles() {

for (var i = 0; i < particles; i++) {

var box = document.createElement('span'); 	// для символа
box.className = masterShapes[Math.floor(Math.random()*7)]; // форма
box.className = box.className + " " + masterColors[Math.floor(Math.random()*3)]; // цвет
box.style.fontSize = Math.floor(Math.random()*100) + 15 + "px"; // размер шрифта
box.style.left = Math.floor(Math.random()*w/10 + w/2 - w/20) + "px"; // загоняем в подвал
box.style.top = h + 100 + "px";

var parentBox = document.createElement('i');
parentBox.appendChild(box);

document.body.appendChild(parentBox);

boxWithParticle[i] = box; // массив частиц
parentBoxWithParticle[i] = parentBox; // массив родителей частиц
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function fadeAndRelocate(time) { // фейд на последней 1/8 пути
    for (var r = 0; r < particles; r++)
    {
        boxWithParticle[r].style.transition = "all "+time/8+"ms linear";
        console.log(time/8)
        boxWithParticle[r].style.opacity = 0; /// ребенок затухает


    boxWithParticle[r].style.webkitTransform =  "none";
    boxWithParticle[r].style.MozTransform =  "none";
    boxWithParticle[r].style.msTransform =  "none";
    boxWithParticle[r].style.OTransform =  "none";
    boxWithParticle[r].style.transform =  "none";


            ////// родитель перемещается в подвал
        parentBoxWithParticle[r].style.left = Math.floor(Math.random()*w/10 + w/2 - w/20) + "px";
        parentBoxWithParticle[r].style.top = h + 100 + "px";
    }
}

function fireGoToSpace(time) {  // запуск


  for (var st = 0; st < particles; st++)  
{

st1 = Math.floor(Math.random()*w); // задаем цель куда полетят частицы по всей ширине
st2 = Math.floor(Math.random()*h*7/8-100); // и по всей высоте


    /// перемещение родителя
parentBoxWithParticle[st].style.opacity = 1;
parentBoxWithParticle[st].style.transition = "all "+time/2+"ms cubic-bezier(0.175, 0.460, 0.380, 1.010)";
    parentBoxWithParticle[st].style.left = st1 + "px";
    parentBoxWithParticle[st].style.top = st2 + "px";
    parentBoxWithParticle[st].style.opacity = 1;


/// вращение ребенка
    boxWithParticle[k].style.webkitTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
    boxWithParticle[k].style.MozTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
    boxWithParticle[k].style.msTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
    boxWithParticle[k].style.OTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
    boxWithParticle[k].style.transform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";

}
}

// готовим координаты ////////////////////////////////////////////////////////////////////////////////////////////
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

    ///// собрали константы для формирования координат частиц

for (var l = 0; l < steps; l++) // по эволюциидля каждой частицы задается икс и игрек
{

x = a * Math.cos(b*(l+1));
y = Math.floor(a * Math.sin(b*(l+1)));

coordinatesX[v*steps+l] = -x*randomX;
coordinatesY[v*steps+l] = -y*randomY + l*randomGravity;
}
} }


//// запуск//// спин должен сохраниться ////////////

function fireSpiral() {
 
for (var k = 0; k < particles; k++) // по частицам
{
 
boxWithParticle[k].style.transition = "all " + allTime*1.2 + "ms cubic-bezier(0.175, 0.460, 0.380, 1.010)";

// boxWithParticle[k].style.transition = "all " + allTime*1.2 + "ms cubic-bezier(.74, 0, .34, 1)";
boxWithParticle[k].style.webkitTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
boxWithParticle[k].style.MozTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
boxWithParticle[k].style.msTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
boxWithParticle[k].style.OTransform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";
boxWithParticle[k].style.transform =  "translate(" + coordinatesX[lay+ k * steps] + "px, " + coordinatesY[lay+ k * steps] + "px) rotate("+spin[k]+"deg) rotateX("+skewX[k]+"deg) rotateY("+skewY[k]+"deg)";

} 

lay = lay + 1;
 
//console.log(lay)
}
 
createParticles();
fireSpiralPrepare();
  

function partA() {
   
 fireGoToSpace(2000);
fireSpiralPrepare();
  setTimeout(partB,allTime/6);

}

function partB() {
  
  var interval = setInterval(function() {
	fireSpiral();
}, allTime/steps);


setInterval(function() {clearInterval(interval);
}, allTime);

again=0;


setTimeout(partC,allTime*7/6);
}
 

function partC() {
fadeAndRelocate(2000);
console.log("Again?");
again=1;
 
}

//=======================================

$( "body" ).on("tap",function() {

    if (again) {


        fadeAndRelocate(2000);
        partA();
    }

});

var velocity;

var checkScrollSpeed = (function(settings){
    settings = settings || {};
  
    var lastPos, newPos, timer, delta, 
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )
  
    function clear() {
      lastPos = null;
      delta = 0;
    }
  
    clear();
    
    return function(){
      newPos = window.scrollY;
      if ( lastPos != null ){ // && newPos < maxScroll 
        delta = newPos -  lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
})();

// listen to "scroll" event
window.onscroll = function(){
   velocity = checkScrollSpeed();
};


$(window).on("scroll", function() {
  var scrollHeight = $(document).height();
  var scrollPosition = $(window).height() + $(window).scrollTop();
  if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
     console.log(velocity)
  }
});



