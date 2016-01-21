var particles = 10; // частицы
var steps = 20; // шаги анимации
var allTime = 2000; // время полета

var w = window.innerWidth;
var h = window.innerHeight;

var gravity = Math.floor(h / 20); // гравитация

var coordinatesX = [];
var coordinatesY = [];

var boxWithParticle = [];
var parentBoxWithParticle = [];

var spin = [];
var skewX = [];
var skewY = [];

var lastX = [];
var lastY = [];

var again = 1;
var lay = 0;

var masterShapes = ["fa fa-one", "fa fa-two", "fa fa-three", "fa fa-four", "fa fa-five", "fa fa-six", "fa fa-seven"];
var masterColors = ["purple", "yellow", "green"];


//$( window ).resize(function() {
//    w = window.innerWidth;
//    h = window.innerHeight;
//    fadeAndRelocate(2000);
//});



// создаем частицы внизу страницы ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createParticles() {

    for (var i = 0; i < particles; i++) {

        var parentBox = document.createElement('div');
        parentBox.className = "particle";

        var box = document.createElement('span'); 	// для символа
        box.className = masterShapes[Math.floor(Math.random() * 7)]; // форма
        box.className = box.className + " " + masterColors[Math.floor(Math.random() * 3)]; // цвет
        box.style.fontSize = Math.floor(Math.random() * 100) + 15 + "px"; // размер шрифта

        parentBox.style.opacity = 1; //todo
        parentBox.appendChild(box);

        document.body.appendChild(parentBox);

        boxWithParticle[i] = box; // массив частиц
        parentBoxWithParticle[i] = parentBox; // массив родителей частиц

        parentBoxWithParticle[i].style.left = Math.floor(Math.random() * w / 10 + w / 2 - w / 20) + "px";
        parentBoxWithParticle[i].style.top = h + 200 + "px";
    }
}

function fadeAndRelocate(timeToDie) { // фейд на последней 1/8 пути
    for (var r = 0; r < particles; r++) {

        parentBoxWithParticle[r].style.transition = "all " + timeToDie + "ms linear";
        parentBoxWithParticle[r].style.opacity = 1; /// родитель затухает TODO

        parentBoxWithParticle[r].style.webkitTransform = "none";
        parentBoxWithParticle[r].style.MozTransform = "none";
        parentBoxWithParticle[r].style.msTransform = "none";
        parentBoxWithParticle[r].style.OTransform = "none";
        parentBoxWithParticle[r].style.transform = "none";

        ////// родитель перемещается в подвал - по ширине живет в середине в полосе ширина / 10
        //  координаты родителя задаются left и top
        parentBoxWithParticle[r].style.left = Math.floor(Math.random() * w / 10 + w / 2 - w / 20) + "px";
        parentBoxWithParticle[r].style.top = h + 200 + "px";
    }

}


// готовим координаты //////////////////////////////////////////////////////////////

function fireGoToSpace(timeToFire) {  // запуск

    for (var st = 0; st < particles; st++) {

        lastX[st] = Math.floor(Math.random() * w - w/2); // сдвиг ширине
        // куда полетят - плюс минус
        // половина ширины
        lastY[st] = -Math.floor(Math.random() * 2 * h /3 + h / 3 + 100); // сдвиг по высоте - на весь экран

        //console.log(lastX[0] +" "+ lastY[0]);

        /// перемещение родителя
        parentBoxWithParticle[st].style.opacity = 1;
        parentBoxWithParticle[st].style.transition = "all " + timeToFire + "ms cubic-bezier(0.175, 0.460, 0.380, 1.010)";
        parentBoxWithParticle[st].style.webkitTransform = "translate(" +  lastX[st] + "px, "   + lastY[st] + "px)";
        parentBoxWithParticle[st].style.MozTransform = "translate(" +  lastX[st] + "px, "   + lastY[st] + "px)";
        parentBoxWithParticle[st].style.msTransform = "translate(" +  lastX[st] + "px, "   + lastY[st] + "px)";
        parentBoxWithParticle[st].style.OTransform = "translate(" +  lastX[st] + "px, "   + lastY[st] + "px)";
        parentBoxWithParticle[st].style.transform = "translate(" +  lastX[st] + "px, "   + lastY[st] + "px)";

        //console.log(parentBoxWithParticle[0].style.left + "   " + parentBoxWithParticle[0].style.top + " - " + parentBoxWithParticle[0].style.webkitTransform)

        /// вращение ребенка

        spin[st] = Math.floor(Math.random() * 5000) - 2000;
        skewX[st] = Math.floor(Math.random() * 5000) - 2000;
        skewY[st] = Math.floor(Math.random() * 5000) - 2000;

        boxWithParticle[st].style.transition = "all " + timeToFire*10 + "ms cubic-bezier(0.175, 0.460, 0.380, 1.010)";
        boxWithParticle[st].style.webkitTransform = "rotate(" + spin[st] + "deg) rotateX(" + skewX[st] + "deg) rotateY(" + skewY[st] + "deg)";
        boxWithParticle[st].style.MozTransform = "rotate(" + spin[st] + "deg) rotateX(" + skewX[st] + "deg) rotateY(" + skewY[st] + "deg)";
        boxWithParticle[st].style.msTransform = "rotate(" + spin[st] + "deg) rotateX(" + skewX[st] + "deg) rotateY(" + skewY[st] + "deg)";
        boxWithParticle[st].style.OTransform = "rotate(" + spin[st] + "deg) rotateX(" + skewX[st] + "deg) rotateY(" + skewY[st] + "deg)";
        boxWithParticle[st].style.transform = "rotate(" + spin[st] + "deg) rotateX(" + skewX[st] + "deg) rotateY(" + skewY[st] + "deg)";


    }


    //// подготовка координат для вращения

    for (var v = 0; v < particles; v++) // по частицам
    {
        var a = Math.random() * 10 + 5;
        var b = Math.random() * 20 * Math.PI / 3;
        var randomGravity = gravity + Math.random() * 15;
        var randomX = Math.random() * 20;
        var randomY = Math.random() * 20;

        ///// собрали константы для формирования координат частиц

        for (var l = 0; l < steps; l++) // по эволюциидля каждой частицы задается икс и игрек
        {
            x = a * Math.cos(b * (l + 1));
            y = Math.floor(a * Math.sin(b * (l + 1)));

/// массивы coordinatesXY устроен так, что подряд записаны координаты развития первой частицы, второй, третьей и так
// далее

            coordinatesX[v * steps + l] = lastX[v] - Math.floor(-x * randomX);
            coordinatesY[v * steps + l] = lastY[v] + Math.floor(-y * randomY + l * randomGravity);


        }




    }

}



//// запуск//// спин должен сохраниться ////////////

function fireSpiral(timeToRockRoll) {

    for (var k = 0; k < particles; k++) // по частицам
    {

        parentBoxWithParticle[k].style.transition = "all " + timeToRockRoll + "ms cubic-bezier(0.175, 0.460, 0.380, 1.010)";
        parentBoxWithParticle[k].style.webkitTransform = "translate(" +   coordinatesX[lay + k * steps] + "px, "   + coordinatesY[lay + k * steps] + "px)";
        parentBoxWithParticle[k].style.MozTransform = "translate(" +   coordinatesX[lay + k * steps] + "px, "   + coordinatesY[lay + k * steps] + "px)";
        parentBoxWithParticle[k].style.msTransform = "translate(" +   coordinatesX[lay + k * steps] + "px, "   + coordinatesY[lay + k * steps] + "px)";
        parentBoxWithParticle[k].style.OTransform = "translate(" +   coordinatesX[lay + k * steps] + "px, "   + coordinatesY[lay + k * steps] + "px)";
        parentBoxWithParticle[k].style.transform = "translate(" +   coordinatesX[lay + k * steps] + "px, "   + coordinatesY[lay + k * steps] + "px)";


        //console.log(parentBoxWithParticle[0].style.left + "   " + parentBoxWithParticle[0].style.top + " - " + parentBoxWithParticle[0].style.webkitTransform)

    }
    lay = lay + 1;
    //console.log(lay)

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
createParticles();
//fadeAndRelocate(10);

function partA() {

    fireGoToSpace(allTime / 3);
    console.log("went to space")

    setTimeout(partB, allTime / 3);
}

function partB() {
    lay = 0;

    var interval = setInterval(function () {
        fireSpiral(allTime);

    }, (allTime / steps));

    setInterval(function () {
        clearInterval(interval);
    }, allTime);

    again = 0;

    console.log("went spiral")

    setTimeout(partC, allTime);
}


function partC() {

    fadeAndRelocate(10);

    console.log("Again?");
    again = 1;

}

//=======================================

$("body").on("tap", function () {

    if (again) {

        partA();
    }

});


//
//var velocity;
//
//var checkScrollSpeed = (function(settings){
//    settings = settings || {};
//
//    var lastPos, newPos, timer, delta,
//        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )
//
//    function clear() {
//      lastPos = null;
//      delta = 0;
//    }
//
//    clear();
//
//    return function(){
//      newPos = window.scrollY;
//      if ( lastPos != null ){ // && newPos < maxScroll
//        delta = newPos -  lastPos;
//      }
//      lastPos = newPos;
//      clearTimeout(timer);
//      timer = setTimeout(clear, delay);
//      return delta;
//    };
//})();
//
//// listen to "scroll" event
//window.onscroll = function(){
//   velocity = checkScrollSpeed();
//};
//
//
//$(window).on("scroll", function() {
//  var scrollHeight = $(document).height();
//  var scrollPosition = $(window).height() + $(window).scrollTop();
//  if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
//     console.log(velocity)
//  }
//});



