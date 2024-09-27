<?php
header('Content-Type: application/json');

if (isset($_GET['cantidad'])) {
    $cantidad = $_GET['cantidad']; // Si se envía 'cantidad', la usamos
} else {
    $cantidad = 10; // Si no, ponemos 10 como valor por defecto
}

$datos = file_get_contents("data.json");
$preguntas_array = json_decode($datos, true);

shuffle($preguntas_array); // Barajamos las preguntas
$preguntas_seleccionadas = array_slice($preguntas_array, 0, $cantidad);

foreach ($preguntas_seleccionadas as &$pregunta) {
    unset($pregunta['resposta_correcta']); // Eliminar el índice correcto
}

echo json_encode($preguntas_seleccionadas); // Devolvemos las preguntas
?>
