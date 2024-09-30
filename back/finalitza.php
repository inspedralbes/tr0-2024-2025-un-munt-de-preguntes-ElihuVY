<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$datos = file_get_contents("data.json");
$preguntas_array = json_decode($datos, true);

$total_respuestas = count($data);
$correctas = 0;

foreach ($data as $respuesta_usuario) {
    $id_pregunta = $respuesta_usuario['id'];
    $respuesta_seleccionada = $respuesta_usuario['respuesta'];

    foreach ($preguntas_array as $pregunta) {
        if ($pregunta['id'] == $id_pregunta && $pregunta['resposta_correcta'] == $respuesta_seleccionada) {
            $correctas++;
            break;
        }
    }
}

echo json_encode([
    'total' => $total_respuestas,
    'correctas' => $correctas
]);
?>
