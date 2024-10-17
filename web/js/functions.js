let preguntas = []; 
let respuestasSeleccionadas = []; 
let indiceActual = 0; 

let divPartida = document.getElementById("partida"); 
let divResultado = document.getElementById("resultado");
let divEstadoPartida = document.getElementById("estadoPartida"); 

let estatDeLaPartida = {
  contadorPreguntes: 0,
  preguntes: [] 
};
function obtenerPreguntas(cantidad) {
  preguntas = []; 
  respuestasSeleccionadas = [];
  indiceActual = 0; 

  fetch(`../back/getPreguntes.php?cantidad=${cantidad}`)
    .then(response => {
      console.log('Respuesta del servidor:', response);
      return response.text();
    })
    .then(text => {
      console.log('Texto recibido:', text);
      return JSON.parse(text); 
    })
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
      <div class="imagen-container">
        <img src="img/${preguntas[indice].imatge}" alt="Imagen de la pregunta" class="imagen-pregunta">
      </div>
      <div class="respuestas-container">
    `; 
      
      respostes.forEach((respuesta, i) => {
      let fondoColor = ''; 
      if (respuestasSeleccionadas[indice] == i) {
        fondoColor = 'background-color: green;';
      }
      contenidoHTML += `
        <button class="respuesta" data-indice="${indice}" data-opcion="${i}" style="${fondoColor}">
          ${respuesta}
        </button>
      `; 
    });

    contenidoHTML += `</div>`; 
    divPartida.innerHTML = contenidoHTML; 
    actualizarEstadoPartida();
}

divPartida.addEventListener("click", function (event) {
  if (event.target.classList.contains("respuesta")) { 
    let indice = parseInt(event.target.getAttribute("data-indice")); 
    let opcion = parseInt(event.target.getAttribute("data-opcion")); 
    seleccionarRespuesta(indice, opcion); 
  }
});


function seleccionarRespuesta(indice, opcion) {
    if (indice < 0 || indice >= preguntas.length) return; 

    if (respuestasSeleccionadas[indice] === opcion) {
      respuestasSeleccionadas[indice] = null; 
    } else {
      respuestasSeleccionadas[indice] = opcion; 
    }

    estatDeLaPartida.preguntes[indice].feta = respuestasSeleccionadas[indice] !== null;
    mostrarPregunta(indice); 
    actualizarEstadoPartida(); 
}


document.getElementById("siguientePregunta").addEventListener("click", function () {
  if (indiceActual < preguntas.length - 1) {
    indiceActual++; 
    mostrarPregunta(indiceActual); 
  } else {
    finalizarQuiz(); 
  }
});

document.getElementById("anteriorPregunta").addEventListener("click", function () {
  if (indiceActual > 0) {
    indiceActual--; 
    mostrarPregunta(indiceActual); 
  }
});

function actualizarEstadoPartida() {
  let estadoHTML = `<div class="estado-partida">`;

  estatDeLaPartida.preguntes.forEach((pregunta, index) => {
    let color = 'grey'; 
    if (pregunta.feta && respuestasSeleccionadas[index] !== null) {
        color = 'green';
    }
    estadoHTML += `<button class="estado-boton" style="background-color: ${color};">${index + 1}</button>`; 
  });

  estadoHTML += '</div>'; 
  divEstadoPartida.innerHTML = estadoHTML;
}
let tiempoRestante = 60; // 1 minuto en segundos
const temporizadorElemento = document.getElementById('temporizador');
let intervalo;

function iniciarTemporizador() {
    intervalo = setInterval(actualizarTemporizador, 1000); // Actualiza cada segundo
}

function actualizarTemporizador() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    temporizadorElemento.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    if (tiempoRestante <= 0) {
        clearInterval(intervalo); // Detiene el temporizador
        temporizadorElemento.textContent = "SE ACABO EL TIEMPO"; // Mostrar "Finalitza" cuando el tiempo termina
        finalizarQuiz(); // Llamar a la función que finaliza el quiz
    }

    // Reducir el tiempo restante
    tiempoRestante--;
}

document.getElementById("empezarTest").addEventListener("click", function() {
  iniciarTest();
});

function iniciarTest() {
  document.getElementById("empezarTestContainer").style.display = "none";
  document.getElementById("temporizador-container").style.display = "block";
  document.getElementById("partida").style.display = "block";
  document.getElementById("estadoPartida").style.display = "block";
  document.querySelector(".navegacion").style.display = "flex";
  iniciarTemporizador();
  obtenerPreguntas(10);
}


function finalizarQuiz() {
  clearInterval(intervalo);
  fetch('../back/finalitza.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ respuestas: respuestasSeleccionadas })
  })
    .then(response => response.json()) 
    .then(data => {
      divPartida.innerHTML = ''; 
      divEstadoPartida.innerHTML = ''; 

      let resultadoHTML = `<h3>Resultados</h3>`;
      resultadoHTML += `<p>${data.correctas} / ${data.total} correctas</p>`;
      resultadoHTML += `<div class="centrar-boton"><button id="reiniciarTest" class="reiniciar-boton">Reiniciar Test</button></div>`;
      divResultado.innerHTML = resultadoHTML;

      document.querySelector(".navegacion").style.display = "none"; 
      document.getElementById("reiniciarTest").addEventListener("click", reiniciarQuiz); 
    })
    .catch(error => console.error('Error al finalizar el quiz:', error));
}


function reiniciarQuiz() {
  clearInterval(intervalo); // Detener el temporizador
  tiempoRestante = 60; // Reiniciar el temporizador
  divResultado.innerHTML = ''; 
  obtenerPreguntas(10); 
  document.querySelector(".navegacion").style.display = "flex";
}

obtenerPreguntas(10);
