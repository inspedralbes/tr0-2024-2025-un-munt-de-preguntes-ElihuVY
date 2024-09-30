<?php
header('Content-Type: application/json');

if (isset($_GET['cantidad'])) {
    $cantidad = $_GET['cantidad'];
} else {
    $cantidad = 10; 
}

$datos = file_get_contents("data.json");
$preguntas_array = json_decode($datos, true);

shuffle($preguntas_array); 
$preguntas_seleccionadas = array_slice($preguntas_array, 0, $cantidad);

foreach ($preguntas_seleccionadas as &$pregunta) {
    unset($pregunta['resposta_correcta']); 
}

echo json_encode($preguntas_seleccionadas); 
?>
