let preguntas = [];
let respuestasSeleccionadas = [];
let indiceActual = 0;
let nombreUsuario = "";

// Elementos del DOM
let divInicio = document.getElementById("inicio");
let divPartida = document.getElementById("partida");
let divResultado = document.getElementById("resultado");
let divPregunta = document.getElementById("pregunta");
let divRespuestas = document.getElementById("respuestas");
let btnAnterior = document.getElementById("anterior");
let btnSiguiente = document.getElementById("siguiente");
let resultadoTexto = document.getElementById("resultadoTexto");

// Comenzar la partida
document.getElementById("comenzar").addEventListener("click", function() {
    nombreUsuario = document.getElementById("nom").value;
    let cantidadPreguntas = parseInt(document.getElementById("cantidad").value);
    
    if (nombreUsuario && cantidadPreguntas > 0) {
        iniciarPartida(cantidadPreguntas);
    } else {
        alert("Por favor, introduce un nombre y selecciona un número válido de preguntas.");
    }
});

// Función para iniciar la partida
function iniciarPartida(cantidad) {
    preguntas = generarPreguntas(cantidad);
    respuestasSeleccionadas = Array(cantidad).fill(null);
    indiceActual = 0;

    divInicio.style.display = "none";
    divPartida.style.display = "block";
    mostrarPregunta(indiceActual);
}

// Función para generar preguntas de ejemplo
function generarPreguntas(cantidad) {
    let preguntasEjemplo = [];
    for (let i = 1; i <= cantidad; i++) {
        preguntasEjemplo.push({
            pregunta: `¿Pregunta ${i}?`,
            respuestas: ["Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4"],
            correcta: Math.floor(Math.random() * 4)
        });
    }
    return preguntasEjemplo;
}

// Mostrar pregunta
function mostrarPregunta(indice) {
    let pregunta = preguntas[indice];
    divPregunta.innerText = pregunta.pregunta;

    // Mostrar las respuestas
    divRespuestas.innerHTML = "";
    pregunta.respuestas.forEach((respuesta, i) => {
        let btnRespuesta = document.createElement("button");
        btnRespuesta.innerText = respuesta;
        btnRespuesta.addEventListener("click", function() {
            seleccionarRespuesta(indice, i);
        });

        // Colorear si está seleccionada
        if (respuestasSeleccionadas[indice] === i) {
            btnRespuesta.style.backgroundColor = "lightblue";
        }

        divRespuestas.appendChild(btnRespuesta);
    });

    // Control de botones de navegación
    btnAnterior.style.display = indice > 0 ? "inline" : "none";
    btnSiguiente.innerText = indice === preguntas.length - 1 ? "Finalizar" : "Siguiente";
}

// Seleccionar respuesta
function seleccionarRespuesta(indice, opcion) {
    respuestasSeleccionadas[indice] = opcion;
}

// Navegación entre preguntas
btnSiguiente.addEventListener("click", function() {
    if (indiceActual < preguntas.length - 1) {
        indiceActual++;
        mostrarPregunta(indiceActual);
    } else {
        finalizarPartida();
    }
});

btnAnterior.addEventListener("click", function() {
    if (indiceActual > 0) {
        indiceActual--;
        mostrarPregunta(indiceActual);
    }
});

// Finalizar partida y mostrar resultados
function finalizarPartida() {
    let correctas = 0;

    preguntas.forEach((pregunta, indice) => {
        if (pregunta.correcta === respuestasSeleccionadas[indice]) {
            correctas++;
        }
    });

    // Mostrar resultado final
    divPartida.style.display = "none";
    divResultado.style.display = "block";
    resultadoTexto.innerText = `${nombreUsuario}, acertaste ${correctas} de ${preguntas.length} preguntas.`;
}

// Reiniciar la partida
document.getElementById("reiniciar").addEventListener("click", function() {
    divResultado.style.display = "none";
    divInicio.style.display = "block";
});
