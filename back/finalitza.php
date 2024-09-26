<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true); // Obtener respuestas del POST

// Suponiendo que las respuestas correctas están en data.json
$datos = file_get_contents("data.json");
$preguntas_array = json_decode($datos, true);

// Inicializar conteo
$total_respuestas = count($data);
$correctas = 0;

// Verificar respuestas
foreach ($data as $index => $respuesta_usuario) {
    if ($preguntas_array[$index]['resposta_correcta'] == $respuesta_usuario) {
        $correctas++;
    }
}

// Retornar resultado
echo json_encode([
    'total' => $total_respuestas,
    'correctas' => $correctas
]);
?>
