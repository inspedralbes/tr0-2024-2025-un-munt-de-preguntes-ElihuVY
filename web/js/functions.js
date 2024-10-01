let preguntas = []; 
let respuestasSeleccionadas = []; 
let indiceActual = 0; 
let divPartida = document.getElementById("partida"); 
let divEstado = document.getElementById("estadoPartida");
let divResultado = document.getElementById("resultado"); 
let estatDeLaPartida = {
  contadorPreguntes: 0, 
  preguntes: [] 
};

// Función para obtener preguntas del servidor
function obtenerPreguntas(cantidad) {
  fetch(`../back/getPreguntes.php?cantidad=${cantidad}`)
    .then(response => response.json())
    .then(data => {
      preguntas = data;
      for (let i = 0; i < preguntas.length; i++) {
        estatDeLaPartida.preguntes.push({ id: preguntas[i].id, feta: false, resposta: null });
      }
      mostrarPregunta(indiceActual); 
      actualizarEstadoPartida(); 
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

    for (let i = 0; i < respostes.length; i++) {
      let seleccionada = ""; 
      if (respuestasSeleccionadas[indice] == i) { 
        seleccionada = "seleccionada";
      }
      
      contenidoHTML += `
        <button class="respuesta ${seleccionada}" data-indice="${indice}" data-opcion="${i}">
          ${respostes[i]}
        </button>
      `;
    }
    

    contenidoHTML += `</div>`;
    contenidoHTML += `
      <div class="navegacion">
        <button id="anteriorPregunta" class="boton-nav">Anterior</button>
        <button id="siguientePregunta" class="boton-nav">Siguiente</button>
      </div>
    `;

    divPartida.innerHTML = contenidoHTML; 

    document.getElementById("anteriorPregunta").addEventListener("click", anteriorPregunta);
    document.getElementById("siguientePregunta").addEventListener("click", siguientePregunta);
  }
}

divPartida.addEventListener("click", function (event) {
  if (event.target.classList.contains("respuesta")) { // ver si se hizo clic en una respuesta
    let indice = event.target.getAttribute("data-indice"); // devuelve el índice de la pregunta
    let opcion = event.target.getAttribute("data-opcion"); // devuelve la opción seleccionada
    seleccionarRespuesta(indice, opcion); // función para seleccionar respuesta
  }
});

function seleccionarRespuesta(indice, opcion) {
  estatDeLaPartida.preguntes[indice].feta = true; 
  estatDeLaPartida.preguntes[indice].resposta = opcion;
  
  if (!respuestasSeleccionadas[indice]) {
    estatDeLaPartida.contadorPreguntes++;
  }

  respuestasSeleccionadas[indice] = opcion; 
  mostrarPregunta(indice); 
  actualizarEstadoPartida(); 
}

function actualizarEstadoPartida() {
  let estadoHTML = `
    <p>Preguntas respondidas: ${estatDeLaPartida.contadorPreguntes} / ${estatDeLaPartida.preguntes.length}</p>
    <ul>
  `;

  estatDeLaPartida.preguntes.forEach((pregunta, index) => {
    let estado; 
    if (pregunta.feta) { 
      estado = pregunta.resposta; 
    } else {
      estado = 'X'; 
    }
    
    estadoHTML += `<li>Pregunta ${index + 1}: ${estado}</li>`;
  });
  

  estadoHTML += `</ul>`;
  divEstado.innerHTML = estadoHTML; 

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
    body: JSON.stringify({ respuestas: respuestasSeleccionadas })
  })
    .then(response => response.json()) 
    .then(data => {
      divPartida.innerHTML = ''; 
      divResultado.innerHTML = `
        <h2>Resultado del Test</h2>
        <p>Total de respuestas: ${data.total}</p>
        <p>Total correctas: ${data.correctas}</p>
        <button id="reiniciarTest" class ="reiniciar">Reiniciar Test</button>
      `;

      document.getElementById("reiniciarTest").addEventListener("click", reiniciarQuiz);
    })
    .catch(error => console.error('Error al finalizar el quiz:', error));
}

function reiniciarQuiz() {
  indiceActual = 0; 
  respuestasSeleccionadas = []; 
  obtenerPreguntas(10); 
}

obtenerPreguntas(10);
