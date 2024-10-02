<?php
session_start();
header('Content-Type: application/json');

require 'db.php'; // Asegúrate de incluir el archivo de conexión a la base de datos

if (isset($_GET['cantidad'])) {
    $cantidad = $_GET['cantidad'];
} else {
    $cantidad = 10; 
}

// Realizar consulta para obtener las preguntas
$sql = "SELECT * FROM preguntas";
$result = $conn->query($sql);

// Array para almacenar todas las preguntas
$preguntas_array = [];

if ($result->num_rows > 0) {
    // Salida de cada fila y llenado del array
    while ($row = $result->fetch_assoc()) {
        $preguntas_array[] = [
            'id' => $row['id'],
            'pregunta' => $row['pregunta'],
            'respostes' => [
                $row['respuesta_0'],
                $row['respuesta_1'],
                $row['respuesta_2']
            ],
            'resposta_correcta' => $row['respuesta_correcta'],
            'imatge' => $row['imatge']
        ];
    }
}

// Mezclar las preguntas
shuffle($preguntas_array); 

// Seleccionar las preguntas que se enviarán
$preguntas_seleccionadas = array_slice($preguntas_array, 0, $cantidad);

// Array para almacenar las respuestas correctas
$respuestas_correctas = [];

foreach ($preguntas_seleccionadas as &$pregunta) {
    $respuestas_correctas[] = $pregunta['resposta_correcta']; 
    unset($pregunta['resposta_correcta']);  // Eliminar la respuesta correcta del array que se va a devolver
}

// Almacenar respuestas correctas en la sesión
$_SESSION['respuestas_correctas'] = $respuestas_correctas;

// Enviar las preguntas seleccionadas como respuesta JSON
echo json_encode($preguntas_seleccionadas);
?>
