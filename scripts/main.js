
// -------------------Power on----------------------

document.getElementById("boton-power").addEventListener("click", encendido =()=>{
    let ledAzul = document.getElementById("ledAzul");
    let ledYellow = document.getElementById("ledYellow");
    let topScreen = document.getElementById("imagen-pantalla-arriba");
    let bottomScreen = document.getElementById("displayPantalla");
    let ledPrincipal = document.getElementById("led")
    let pantallaJuego = document.getElementById("juegoDinosaurio");


    // -------------------Led Azul-------------------

    if (ledAzul.classList.value === "ledColor"){
        ledAzul.classList.add("ledazul");
        ledAzul.classList.remove("ledColor");
    } else if( ledAzul.classList.value === "ledazul"){
        ledAzul.classList.add("ledColor");
        ledAzul.classList.remove("ledazul")
    }


    // ---------------------Led principal----------------

    if (ledPrincipal.classList.value === "ledColor"){
        ledPrincipal.classList.add("ledVerde");
        ledPrincipal.classList.remove("ledColor");
    } else if( ledPrincipal.classList.value === "ledVerde"){
        ledPrincipal.classList.add("ledColor");
        ledPrincipal.classList.remove("ledVerde")
    }

    // ----------------------Led Amarillo--------------------

    
    if (ledYellow.classList.value === "ledColor"){
        ledYellow.classList.add("ledyellow");
        ledYellow.classList.remove("ledColor");
    } else if( ledYellow.classList.value === "ledyellow"){
        ledYellow.classList.add("ledColor");
        ledYellow.classList.remove("ledyellow")
    }

        // ----------------------Pantalla de Arriba-----------------
    
        if (topScreen.classList.value === "sombraGeneral displayNone"){
            topScreen.classList.remove("displayNone");
            document.getElementById("audio").innerHTML = '<audio src="/audio/3ds-startup.mp3" autoplay="autoplay"></audio>'
        } else if( topScreen.classList.value === "sombraGeneral"){
            topScreen.classList.add("displayNone");

        }

        // ------------------Pantalla de abajo-------------

        if(bottomScreen.classList.value === "displayNone" && pantallaJuego.classList.value === "contenedor"){
            pantallaJuego.classList.add("displayNone");
        }else if (bottomScreen.classList.value === "displayNone"){
            bottomScreen.classList.remove("displayNone");
        } else if( bottomScreen.classList.value === "" ){
            bottomScreen.classList.add("displayNone");

        }

        

})


// -----------------Empieza juego dinosaurio--------------

document.getElementById("dinosaurio").addEventListener("click", ()=>{

    let pantallaMenu = document.getElementById("displayPantalla");
    let pantallaJuego = document.getElementById("juegoDinosaurio");

    if (pantallaMenu.classList.value === ""){
        pantallaMenu.classList.add("displayNone");
        pantallaJuego.classList.remove("displayNone");

    }

        
    
})














// --------------Juego-------------------


var time = new Date();
var deltaTime = 0;

if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init); 
}

function Init() {
    time = new Date();
    Start();
    Loop();
}

function Loop() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();
    Update();
    requestAnimationFrame(Loop);
}

//****** GAME LOGIC ********//

let sueloY = 22;
let velY = 0;
let impulso = 900;
let gravedad = 2500;

let dinoPosX = 42;
let dinoPosY = sueloY; 

let sueloX = 0;
let velEscenario = 880/3;
let gameVel = 1;
let score = 0;

let parado = false;
let saltando = false;

let tiempoHastaObstaculo = 2;
let tiempoObstaculoMin = 0.7;
let tiempoObstaculoMax = 1.8;
let obstaculoPosY = 16;
let obstaculos = [];

let tiempoHastaNube = 0.5;
let tiempoNubeMin = 0.7;
let tiempoNubeMax = 2.7;
let maxNubeY = 270;
let minNubeY = 100;
let nubes = [];
let velNube = 0.5;

let contenedor;
let dino;
let textoScore;
let suelo;
let gameOver;

function Start() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", HandleKeyDown);
}

function Update() {
    if(parado) return;
    
    MoverDinosaurio();
    MoverSuelo();
    DecidirCrearObstaculos();
    DecidirCrearNubes();
    MoverObstaculos();
    MoverNubes();
    DetectarColision();

    velY -= gravedad * deltaTime;
}

function HandleKeyDown(ev){
    if(ev.keyCode == 32){
        Saltar();
    }
}

function Saltar(){
    if(dinoPosY === sueloY){
        saltando = true;
        velY = impulso;
        dino.classList.remove("dino-corriendo");
    }
}

function MoverDinosaurio() {
    dinoPosY += velY * deltaTime;
    if(dinoPosY < sueloY){
        
        TocarSuelo();
    }
    dino.style.bottom = dinoPosY+"px";
}

function TocarSuelo() {
    dinoPosY = sueloY;
    velY = 0;
    if(saltando){
        dino.classList.add("dino-corriendo");
    }
    saltando = false;
}

function MoverSuelo() {
    sueloX += CalcularDesplazamiento();
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
}

function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}

function Estrellarse() {
    dino.classList.remove("dino-corriendo");
    dino.classList.add("dino-estrellado");
    parado = true;
}

function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;
    if(tiempoHastaObstaculo <= 0) {
        CrearObstaculo();
    }
}

function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime;
    if(tiempoHastaNube <= 0) {
        CrearNube();
    }
}

function CrearObstaculo() {
    var obstaculo = document.createElement("div");
    contenedor.appendChild(obstaculo);
    obstaculo.classList.add("cactus");
    if(Math.random() > 0.5) obstaculo.classList.add("cactus2");
    obstaculo.posX = contenedor.clientWidth;
    obstaculo.style.left = contenedor.clientWidth+"px";

    obstaculos.push(obstaculo);
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax-tiempoObstaculoMin) / gameVel;
}

function CrearNube() {
    var nube = document.createElement("div");
    contenedor.appendChild(nube);
    nube.classList.add("nube");
    nube.posX = contenedor.clientWidth;
    nube.style.left = contenedor.clientWidth+"px";
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";
    
    nubes.push(nube);
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gameVel;
}

function MoverObstaculos() {
    for (var i = obstaculos.length - 1; i >= 0; i--) {
        if(obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]);
            obstaculos.splice(i, 1);
            GanarPuntos();
        }else{
            obstaculos[i].posX -= CalcularDesplazamiento();
            obstaculos[i].style.left = obstaculos[i].posX+"px";
        }
    }
}

function MoverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {
        if(nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]);
            nubes.splice(i, 1);
        }else{
            nubes[i].posX -= CalcularDesplazamiento() * velNube;
            nubes[i].style.left = nubes[i].posX+"px";
        }
    }
}

function GanarPuntos() {
    score++;
    textoScore.innerText = score;
    if(score == 5){
        gameVel = 1.2;
    }else if(score == 10) {
        gameVel = 1.5;
    } else if(score == 20) {
        gameVel = 2;
    }
    suelo.style.animationDuration = (3/gameVel)+"s";
}

function GameOver() {
    Estrellarse();
    gameOver.style.display = "block";
}

function DetectarColision() {
    for (var i = 0; i < obstaculos.length; i++) {
        if(obstaculos[i].posX > dinoPosX + dino.clientWidth) {
            //EVADE
            break; //al estar en orden, no puede chocar con más
        }else{
            if(IsCollision(dino, obstaculos[i], 10, 30, 15, 20)) {
                GameOver();
            }
        }
    }
}

function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}

