let preguntas = [];
let respuestasSeleccionadas = [];
let indiceActual = 0;
let tiempo; // Variable para almacenar el temporizador
let tiempoLimite = 30; // Limite de tiempo en segundos
let interval; // Intervalo del temporizador

let divPartida = document.getElementById("partida");
let divResultado = document.getElementById("resultado");
let divEstadoPartida = document.getElementById("estadoPartida");
let divTimer = document.getElementById("timer");
let divUserForm = document.getElementById("user-form");

let estatDeLaPartida = {
  contadorPreguntes: 0,
  preguntes: []
};

document.getElementById("startGame").addEventListener("click", function() {
    const username = document.getElementById("username").value.trim();
    const questionCount = parseInt(document.getElementById("questionCount").value);

    if (username === "") {
        alert("Si us plau, introdueix el teu nom.");
        return;
    }

    if (questionCount < 5 || questionCount > 30) {
        alert("El nombre de preguntes ha de ser entre 6 i 30.");
        return;
    }

    // Guardar el nom en localStorage
    localStorage.setItem("username", username);
    divUserForm.style.display = "none"; // Ocultar el formulari
    divTimer.style.display = "block"; // Mostrar el temporizador

    obtenerPreguntas(questionCount); // Cargar preguntas
    iniciarTemporizador(); // Iniciar el temporizador
});

document.getElementById("clearName").addEventListener("click", function() {
    localStorage.removeItem("username");
    document.getElementById("username").value = '';
    alert("Nom esborrat. Introdueix un nou nom per començar el test.");
});

function iniciarTemporizador() {
    tiempo = tiempoLimite; // Reiniciar el tiempo
    document.getElementById("time").textContent = tiempo; // Mostrar tiempo inicial

    interval = setInterval(function() {
        tiempo--;
        document.getElementById("time").textContent = tiempo;

        if (tiempo <= 0) {
            clearInterval(interval); // Detener el temporizador
            finalizarQuiz(); // Finalizar el test
        }
    }, 1000);
}

function obtenerPreguntas(cantidad) {
    preguntas = [];
    respuestasSeleccionadas = [];
    indiceActual = 0;

    fetch(`../back/getPreguntes.php?cantidad=${cantidad}`) // Cambia la ruta según tu estructura
        .then(response => response.json())
        .then(data => {
            preguntas = data;
            estatDeLaPartida.preguntes = preguntas.map(pregunta => ({
                id: pregunta.id,
                feta: false,
                resposta: null
            }));
            mostrarPregunta(indiceActual);
            actualizarEstadoPartida();
        })
        .catch(error => console.error('Error al obtener preguntas:', error));
}

function mostrarPregunta(indice) {
    if (indice < 0 || indice >= preguntas.length) return;

    let pregunta = preguntas[indice].pregunta;
    let respostes = preguntas[indice].respostes;
    let contenidoHTML = `
        <div class="pregunta">${pregunta}</div>
        <div class="respuestas-container">
    `;

    respostes.forEach((respuesta, i) => {
        contenidoHTML += `
            <button class="respuesta" data-indice="${indice}" data-opcion="${i}">
                ${respuesta}
            </button>
        `;
    });

    contenidoHTML += `</div>`;
    divPartida.innerHTML = contenidoHTML;
    divPartida.style.display = "block"; // Mostrar las preguntas
    actualizarEstadoPartida();
}

divPartida.addEventListener("click", function(e) {
    if (e.target.classList.contains("respuesta")) {
        let indicePregunta = e.target.getAttribute("data-indice");
        let opcionSeleccionada = e.target.getAttribute("data-opcion");

        respuestasSeleccionadas[indicePregunta] = opcionSeleccionada;
        estatDeLaPartida.preguntes[indicePregunta].feta = true;

        // Mostrar siguiente pregunta
        if (indiceActual < preguntas.length - 1) {
            indiceActual++;
            mostrarPregunta(indiceActual);
        } else {
            finalizarQuiz();
        }
    }
});

function finalizarQuiz() {
    clearInterval(interval); // Detener el temporizador
    mostrarResultado();
}

function mostrarResultado() {
    divPartida.style.display = "none"; // Ocultar preguntas
    divTimer.style.display = "none"; // Ocultar el temporizador
    divResultado.style.display = "block"; // Mostrar resultado

    let username = localStorage.getItem("username");
    let puntuacio = calcularPuntuacio();
    divResultado.innerHTML = `
        <h2>Resultats de ${username}</h2>
        <p>Puntuació: ${puntuacio} / ${preguntas.length}</p>
    `;
}

function calcularPuntuacio() {
    let correctas = 0;
    preguntas.forEach((pregunta, i) => {
        if (pregunta.correcta === respuestasSeleccionadas[i]) {
            correctas++;
        }
    });
    return correctas;
}

// Inicializar el nombre del usuario si ya está almacenado
document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("username").value = username;
        document.getElementById("user-form").style.display = "none"; // Ocultar el formulario
    }
});
