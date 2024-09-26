<?php
header('Content-Type: application/json');

$cantidad = isset($_GET['cantidad']) ? intval($_GET['cantidad']) : 10;

$datos = file_get_contents("data.json");
$preguntas_array = json_decode($datos, true);

shuffle($preguntas_array);
$preguntas_seleccionadas = array_slice($preguntas_array, 0, $cantidad);

foreach ($preguntas_seleccionadas as &$pregunta) {
    unset($pregunta['resposta_correcta']); // Eliminar la respuesta correcta del resultado
}

echo json_encode($preguntas_seleccionadas);
?>
