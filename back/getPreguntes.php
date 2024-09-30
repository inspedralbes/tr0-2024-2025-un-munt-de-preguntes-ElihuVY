<?php
session_start(); 
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

$respuestas_correctas = [];

foreach ($preguntas_seleccionadas as &$pregunta) {
    $respuestas_correctas[] = $pregunta['resposta_correcta']; 
    unset($pregunta['resposta_correcta']);  
}

$_SESSION['respuestas_correctas'] = $respuestas_correctas;

echo json_encode($preguntas_seleccionadas);
?>
