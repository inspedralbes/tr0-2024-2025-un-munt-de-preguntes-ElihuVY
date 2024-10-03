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
    const questionCount = document.getElementById("questionCount").value;

    if (username === "") {
        alert("Si us plau, introdueix el teu nom.");
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

function reiniciarQuiz() {
    clearInterval(interval); // Limpiar el temporizador
    divResultado.innerHTML = '';
    divUserForm.style.display = "block"; // Mostrar el formulario nuevamente
    divTimer.style.display = "none"; // Ocultar el temporizador
    preguntas = [];
    respuestasSeleccionadas = [];
    indiceActual = 0;
}

// Cargamos 10 preguntas al inicio
obtenerPreguntas(30);
