//1. Hacer una solicitud GET con fetch para recuperar un JSON
// Realizar una solicitud GET para obtener datos en formato JSON
fetch('https://api.example.com/data')
  .then(response => response.json())  // Convertir respuesta a JSON
  .then(data => {
    console.log('Datos recibidos:', data);
    // Aquí podrías usar los datos para otras funciones
  })
  .catch(error => console.error('Error al obtener datos:', error));

//2. Renderizar el contenido del JSON en pantalla e inyectarlo en un div
//<div id="contenido"></div>

//<script>/
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    let html = `
      <h2>${data.titulo}</h2>
      <p>${data.descripcion}</p>
    `;
    document.getElementById('contenido').innerHTML = html;  // Inyectar el contenido
  });
//</script>

//3. Agregar información al HTML construido para saber la identificación del elemento
<div id="elementos">
  <button data-id="101">Elemento 1</button>
  <button data-id="102">Elemento 2</button>
</div>

//<script>
document.getElementById('elementos').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    let elementoID = event.target.getAttribute('data-id');  // Obtener el data-id
    console.log('Elemento clicado con ID:', elementoID);
  }
});
//</script>

//4. Agregar un onclick que llame a una función que muestre un mensaje cuando hago clic
<button onclick="mostrarMensaje()">Haz clic aquí</button>

//<script>
function mostrarMensaje() {
  alert('¡Has hecho clic en el botón!');
}
//</script>

//5. Agregar un EventListener usando delegación de eventos que reacciona con clic y detectar quién generó el evento
<div id="contenedor">
  <button class="btn" data-item="1">Botón 1</button>
  <button class="btn" data-item="2">Botón 2</button>
</div>

//<script>
document.getElementById('contenedor').addEventListener('click', function(event) {
  if (event.target.classList.contains('btn')) {  // Delegación de eventos
    let itemID = event.target.getAttribute('data-item');  // Obtener el identificador del botón
    console.log('Botón clicado con ID:', itemID);
  }
});
//</script>

//6. Reconocer exactamente qué se está presionando y recuperar su identificador
<div>
  <button id="btnA">Botón A</button>
  <button id="btnB">Botón B</button>
</div>

//<script>
document.addEventListener('click', function(event) {
  let elementoID = event.target.id;  // Obtener el ID del botón presionado
  if (elementoID) {
    console.log('Elemento clicado:', elementoID);
  }
});
//</script>


