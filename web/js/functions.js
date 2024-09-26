let divPartida = document.getElementById("partida");
let divResultado = document.getElementById("resultado");

function obtenerPreguntas(cantidad) {
  fetch(`../back/getPreguntes.php?cantidad=${cantidad}`)
    .then(response => {
      return response.json();
    })
    .then(data => mostrarPreguntas(data));
}

function mostrarPreguntas(data){
  let contenidoHTML = "";
  for (let index = 0; index < data.length; index++) {
    let pregunta = data[index].pregunta;
    let respostes = data[index].respostes;
    contenidoHTML += `<div class="pregunta">${pregunta}</div><br>`;
    contenidoHTML += `<br><img src="img/${data[index].imatge}" alt="Imagen de la pregunta">`;
    contenidoHTML += `<div class="respuestas">`;

    for (let i = 0; i < respostes.length; i++) {
      let respuesta = respostes[i];
      contenidoHTML += `<button class="respuesta" onclick="mostrarSeleccion('${respuesta}')">${respuesta}</button>`;
    }

    contenidoHTML += `</div>`; 
    contenidoHTML += "<br><br>";
  }
  contenidoHTML += `<button onclick="finalizarQuiz()">Finalizar</button>`;
  divPartida.innerHTML = contenidoHTML;
}
function seleccionarRespuesta(indice, opcion) {
  respuestasSeleccionadas[indice] = opcion; // Guardar respuesta en el array
  alert(`Has seleccionado la opción: ${opcion}`);
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
    .then(data => mostrarResultado(data))
    .catch(error => console.error('Error al finalizar el quiz:', error));
}

function mostrarResultado(data) {
  divResultado.innerHTML = 
  `<h2>Resultado:</h2>
    <p>Total de respuestas: ${data.total}</p>
    <p>Total correctas: ${data.correctas}</p>`;
}
obtenerPreguntas(10);
