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
      // Imprimir la respuesta para depuración
      console.log('Respuesta del servidor:', response);
      return response.text(); // Cambiar a text() para ver qué está devolviendo el servidor
    })
    .then(text => {
      console.log('Texto recibido:', text); // Imprimir el texto para ver si es válido
      return JSON.parse(text); // Intenta convertirlo a JSON
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
  if (indice < 0 || indice >= preguntas.length) return; // Limitar rangos

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
    let fondoColor = respuestasSeleccionadas[indice] == i ? 'background-color: green;' : '';
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
  if (indice < 0 || indice >= preguntas.length) return; // Evitar índices inválidos

  respuestasSeleccionadas[indice] = respuestasSeleccionadas[indice] === opcion ? null : opcion;
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
    let color = pregunta.feta ? (respuestasSeleccionadas[index] !== null ? 'green' : 'grey') : 'grey';
    estadoHTML += `<button class="estado-boton" style="background-color: ${color};">${index + 1}</button>`;
  });

  estadoHTML += '</div>';
  divEstadoPartida.innerHTML = estadoHTML;
}

function finalizarQuiz() {
  fetch('../back/finalitza.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ respuestas: respuestasSeleccionadas })
  })
    .then(response => response.json())
    .then(data => {
      divPartida.innerHTML = '';
      divEstadoPartida.innerHTML = '';

    // Mostrar solo el resultado final
    let resultadoHTML = `<h3>Resultados</h3>`;
    
    // Mostrar total de correctas
    resultadoHTML += `<p>${data.correctas} / ${data.total} correctas</p>`;
    
    // Botón para reiniciar el test, centrado
    resultadoHTML += `<div class="centrar-boton"><button id="reiniciarTest" class="reiniciar-boton">Reiniciar Test</button></div>`;
    
    divResultado.innerHTML = resultadoHTML;

    document.querySelector(".navegacion").style.display = "none";
    
    // Añadir el evento para reiniciar el test
    document.getElementById("reiniciarTest").addEventListener("click", reiniciarQuiz);
  })
  .catch(error => console.error('Error al finalizar el quiz:', error));
      let resultadoHTML = `<h3>Resultados</h3>`;
      resultadoHTML += `<p>${data.correctas} / ${data.total} correctas</p>`;
      resultadoHTML += `<div class="centrar-boton"><button id="reiniciarTest" class="reiniciar-boton">Reiniciar Test</button></div>`;

      divResultado.innerHTML = resultadoHTML;
      document.querySelector(".navegacion").style.display = "none";

      document.getElementById("reiniciarTest").addEventListener("click", reiniciarQuiz);
    }

function reiniciarQuiz() {
  divResultado.innerHTML = ''; 
  obtenerPreguntas(10); 
  document.querySelector(".navegacion").style.display = "flex"; 
}

// Cargamos 10 preguntas al inicio
obtenerPreguntas(10);
