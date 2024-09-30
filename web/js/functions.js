let preguntas = [];
let respuestasSeleccionadas = [];
let indiceActual = 0;
let divPartida = document.getElementById("partida");
let divResultado = document.getElementById("resultado");

function obtenerPreguntas(cantidad) {
  fetch(`../back/getPreguntes.php?cantidad=${cantidad}`)
    .then(response => response.json())
    .then(data => {
      preguntas = data;
      mostrarPregunta(indiceActual); // Mostramos la primera pregunta
    })
    .catch(error => console.error('Error al obtener preguntas:', error));
}

function mostrarPregunta(indice) {
  if (indice >= 0 && indice < preguntas.length) {
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
      let seleccionada = respuestasSeleccionadas[indice] && respuestasSeleccionadas[indice].respuesta === i ? "seleccionada" : "";
      contenidoHTML += `
        <button class="respuesta ${seleccionada}" onclick="seleccionarRespuesta(${indice}, ${i})">
          ${respuesta}
        </button>
      `;
    });

    contenidoHTML += `</div>`;
    contenidoHTML += `
      <div class="navegacion">
        <button onclick="anteriorPregunta()" class="boton-nav">Anterior</button>
        <button onclick="siguientePregunta()" class="boton-nav">Siguiente</button>
      </div>
    `;

    divPartida.innerHTML = contenidoHTML;
  }
}

function seleccionarRespuesta(indice, opcion) {
  respuestasSeleccionadas[indice] = {
    id: preguntas[indice].id, // Guardamos el id de la pregunta
    respuesta: opcion         // Guardamos la respuesta seleccionada
  };
  mostrarPregunta(indice); // Volvemos a mostrar la pregunta para actualizar el marcado
}

function siguientePregunta() {
  if (indiceActual < preguntas.length - 1) {
    indiceActual++;
    mostrarPregunta(indiceActual);
  } else {
    finalizarQuiz();
  }
}

function anteriorPregunta() {
  if (indiceActual > 0) {
    indiceActual--;
    mostrarPregunta(indiceActual);
  }
}

function finalizarQuiz() {
  fetch('../back/finalitza.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(respuestasSeleccionadas),
  })
    .then(response => response.json())
    .then(data => {
      divPartida.innerHTML = `
        <h2>Resultado del Test</h2>
        <p>Total de respuestas: ${data.total}</p>
        <p>Total correctas: ${data.correctas}</p>
        <button onclick="reiniciarQuiz()">Reiniciar Test</button>
      `;
    })
    .catch(error => console.error('Error al finalizar el quiz:', error));
}

function reiniciarQuiz() {
  indiceActual = 0;
  respuestasSeleccionadas = [];
  divResultado.innerHTML = '';
  obtenerPreguntas(10);
}

obtenerPreguntas(10);
