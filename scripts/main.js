function dinosaurio(){
    alert("Esto es un dinosaurio");

}

// -------------------Power on----------------------

document.getElementById("boton-power").addEventListener("click", encendido =()=>{
    let ledAzul = document.getElementById("ledAzul");
    let ledYellow = document.getElementById("ledYellow");
    let topScreen = document.getElementById("imagen-pantalla-arriba");
    let bottomScreen = document.getElementById("displayPantalla");

    // -------------------Led Azul-------------------

    if (ledAzul.classList.value === "ledColor"){
        ledAzul.classList.add("ledazul");
        ledAzul.classList.remove("ledColor");
    } else if( ledAzul.classList.value === "ledazul"){
        ledAzul.classList.add("ledColor");
        ledAzul.classList.remove("ledazul")
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
        } else if( topScreen.classList.value === "sombraGeneral"){
            topScreen.classList.add("displayNone");

        }

        // ------------------Pantalla de abajo-------------
        if (bottomScreen.classList.value === "displayNone"){
            bottomScreen.classList.remove("displayNone");
        } else if( bottomScreen.classList.value === ""){
            bottomScreen.classList.add("displayNone");

        }

})