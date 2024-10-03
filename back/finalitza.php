<?php
session_start();
header('Content-Type: application/json');

$respuestas_correctas = $_SESSION['respuestas_correctas'];
$respuestas_usuario = json_decode(file_get_contents('php://input'), true);

if (!isset($respuestas_usuario['respuestas']) || !is_array($respuestas_usuario['respuestas'])) {
    echo json_encode([
        'error' => 'Las respuestas del usuario no se recibieron correctamente.'
    ]);
    exit;
}

$respuestas_usuario = $respuestas_usuario['respuestas'];
$respuestas_correctas_usuario = 0;
$total_respuestas = count($respuestas_usuario);

foreach ($respuestas_usuario as $indice => $respuesta_usuario) {
    if (isset($respuestas_correctas[$indice]) && $respuesta_usuario == $respuestas_correctas[$indice]) {
        $respuestas_correctas_usuario++;
    }
}

echo json_encode([
    'total' => $total_respuestas,
    'correctas' => $respuestas_correctas_usuario
]);
?>
