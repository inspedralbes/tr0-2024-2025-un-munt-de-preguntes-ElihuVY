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
  estatDeLaPartida = {
    contadorPreguntes: 0,
    preguntes: []
  };

  fetch(`../back/getPreguntes.php?cantidad=${cantidad}`)
    .then(response => response.json())
    .then(data => {
      preguntas = data;
      estatDeLaPartida.preguntes = preguntas.map((pregunta) => ({
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
      let fondoColor = '';

      // Marcar el botón de respuesta si fue seleccionada
      if (respuestasSeleccionadas[indice] == i) {
        fondoColor = 'background-color: green;'; // Respuesta seleccionada
      }

      contenidoHTML += `
        <button class="respuesta" data-indice="${indice}" data-opcion="${i}" style="${fondoColor}">
          ${respostes[i]}
        </button>
      `;
    }

    contenidoHTML += `</div>`;
    divPartida.innerHTML = contenidoHTML;

    // Actualizar estado de los botones de respuesta
    actualizarEstadoPartida();
  }
}

divPartida.addEventListener("click", function (event) {
  if (event.target.classList.contains("respuesta")) {
    let indice = event.target.getAttribute("data-indice");
    let opcion = event.target.getAttribute("data-opcion");
    seleccionarRespuesta(indice, opcion);
  }
});

function seleccionarRespuesta(indice, opcion) {
  // Si la opción ya está seleccionada, desmarcarla
  if (respuestasSeleccionadas[indice] === opcion) {
    respuestasSeleccionadas[indice] = null; // Desmarcar
    estatDeLaPartida.preguntes[indice].feta = false; // Marcar como no respondida
  } else {
    // Guardar la respuesta seleccionada
    respuestasSeleccionadas[indice] = opcion;

    // Marcar la pregunta como respondida
    estatDeLaPartida.preguntes[indice].feta = true;
  }

  // Actualizar la visualización de las preguntas
  mostrarPregunta(indice); // Mostrar la pregunta actualizada
  actualizarEstadoPartida(); // Actualizar el estado de la partida
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

  estadoHTML += '<div class="estado-botones">';
  estatDeLaPartida.preguntes.forEach((pregunta, index) => {
    let color = '';

    // Determinar el color del botón según si la respuesta fue correcta o incorrecta
    if (pregunta.feta) {
      if (respuestasSeleccionadas[index] !== null) {
        if (respuestasSeleccionadas[index] === pregunta.resposta) {
          color = 'green'; // Respuesta correcta
        } else {
          color = 'blue'; // Respuesta incorrecta
        }
      } else {
        color = 'grey'; // Pregunta respondida pero sin respuesta seleccionada
      }
    } else {
      color = 'grey'; // Pregunta no respondida
    }

    estadoHTML += `<button class="estado-boton" style="background-color: ${color};">${index + 1}</button>`;
  });
  estadoHTML += '</div>';

  estadoHTML += `</div>`;
  divEstadoPartida.innerHTML = estadoHTML;
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
    divPartida.innerHTML = ''; // Limpiar la parte de las preguntas
    divEstadoPartida.innerHTML = ''; // Limpiar el estado de la partida

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
}

function reiniciarQuiz() {
  divResultado.innerHTML = ''; 
  obtenerPreguntas(10); 
  // Mostrar los botones de navegación de nuevo
  document.querySelector(".navegacion").style.display = "flex"; 
}

obtenerPreguntas(10);
