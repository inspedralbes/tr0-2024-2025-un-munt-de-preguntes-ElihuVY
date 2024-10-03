let preguntas = [];
let respuestasSeleccionadas = [];
let indiceActual = 0;

let divInicio = document.getElementById("inicio");
let divPartida = document.getElementById("partida");
let divResultado = document.getElementById("resultado");
let divEstadoPartida = document.getElementById("estadoPartida");

let estatDeLaPartida = {
  contadorPreguntes: 0,
  preguntes: []
};

// Mostrar el formulario de inicio
function mostrarFormulariInici() {
  let nomUsuari = localStorage.getItem("nomUsuari");
  let nombrePreguntes = localStorage.getItem("nombrePreguntes");

  if (!nomUsuari) {
    divInicio.innerHTML = `
      <h2>Benvingut al Test de Conducció!</h2>
      <label for="nom">Nom:</label>
      <input type="text" id="nom" placeholder="Introdueix el teu nom" required>
      <label for="cantidad">Nombre de preguntes:</label>
      <input type="number" id="cantidad" value="10" min="1" required>
      <button id="començar">Començar</button>
      <button id="esborrarNom">Esborrar Nom</button>
    `;

    document.getElementById("començar").addEventListener("click", iniciarPartida);
    document.getElementById("esborrarNom").addEventListener("click", esborrarNom);
  } else {
    // Si el nombre ya está almacenado, iniciar la partida automáticamente
    iniciarPartida(nombrePreguntes);
  }
}

// Iniciar la partida
function iniciarPartida() {
  let nom = document.getElementById("nom").value;
  let cantidad = parseInt(document.getElementById("cantidad").value);

  if (nom) {
    localStorage.setItem("nomUsuari", nom);
  }
  if (cantidad > 0) {
    localStorage.setItem("nombrePreguntes", cantidad);
    obtenerPreguntas(cantidad);
  }
  divInicio.style.display = "none";
  divPartida.style.display = "block";
  divEstadoPartida.style.display = "block";
  document.querySelector(".navegacion").style.display = "flex";
}

// Función para borrar el nombre
function esborrarNom() {
  localStorage.removeItem("nomUsuari");
  localStorage.removeItem("nombrePreguntes");
  mostrarFormulariInici(); // Volver a mostrar el formulario
}

// Obtener preguntas desde el servidor
function obtenerPreguntas(cantidad) {
  preguntas = [];
  respuestasSeleccionadas = [];
  indiceActual = 0;

  fetch(`../back/getPreguntes.php?cantidad=${cantidad}`)
    .then(response => response.text())
    .then(text => JSON.parse(text))
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

// Mostrar la pregunta actual
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

// Seleccionar respuesta
function seleccionarRespuesta(indice, opcion) {
  if (indice < 0 || indice >= preguntas.length) return; // Evitar índices inválidos

  respuestasSeleccionadas[indice] = respuestasSeleccionadas[indice] === opcion ? null : opcion;
  estatDeLaPartida.preguntes[indice].feta = respuestasSeleccionadas[indice] !== null;

  mostrarPregunta(indice);
  actualizarEstadoPartida();
}

// Navegar entre preguntas
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

// Actualizar estado de la partida
function actualizarEstadoPartida() {
  let estadoHTML = `<div class="estado-partida">`;

  estatDeLaPartida.preguntes.forEach((pregunta, index) => {
    let color = pregunta.feta ? (respuestasSeleccionadas[index] !== null ? 'green' : 'grey') : 'grey';
    estadoHTML += `<button class="estado-boton" style="background-color: ${color};">${index + 1}</button>`;
  });

  estadoHTML += '</div>';
  divEstadoPartida.innerHTML = estadoHTML;
}

// Finalizar el quiz
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
}

// Reiniciar el quiz
function reiniciarQuiz() {
  divResultado.innerHTML = ''; 
  obtenerPreguntas(10); 
  document.querySelector(".navegacion").style.display = "flex"; 
}

// Cargamos el formulario de inicio al cargar la página
mostrarFormulariInici();
