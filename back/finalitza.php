<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true); // Obtener las respuestas enviadas

$datos = file_get_contents("data.json");
$preguntas_array = json_decode($datos, true);

$total_respuestas = count($data);
$correctas = 0;

foreach ($data as $index => $respuesta_usuario) {
    // Comparamos la respuesta del usuario con la respuesta correcta
    if ($preguntas_array[$index]['resposta_correcta'] == $respuesta_usuario) {
        $correctas++;
    }
}

echo json_encode([
    'total' => $total_respuestas,
    'correctas' => $correctas
]);
?>
