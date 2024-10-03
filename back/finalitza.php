<?php
session_start();
header('Content-Type: application/json');

$respuestas_correctas = $_SESSION['respuestas_correctas'];
$respuestas_usuario = json_decode(file_get_contents('php://input'), true);

// Verifica que las respuestas se hayan recibido correctamente
if (!isset($respuestas_usuario['respuestas']) || !is_array($respuestas_usuario['respuestas'])) {
    echo json_encode([
        'error' => 'Las respuestas del usuario no se recibieron correctamente.'
    ]);
    exit;
}

$respuestas_usuario = $respuestas_usuario['respuestas'];
$respuestas_correctas_usuario = 0;
$total_respuestas = count($respuestas_usuario);

// Para depurar, vamos a imprimir las respuestas correctas y las del usuario
echo "Respuestas Correctas: ";
print_r($respuestas_correctas);
echo "<br>Respuestas del Usuario: ";
print_r($respuestas_usuario);
echo "<br>";

// Comprobamos las respuestas
foreach ($respuestas_usuario as $pregunta_id => $respuesta_usuario) {
    if (isset($respuestas_correctas[$pregunta_id])) {
        // Muestra qué respuesta del usuario está siendo comparada con la respuesta correcta
        echo "Pregunta ID: $pregunta_id, Respuesta del Usuario: $respuesta_usuario, Respuesta Correcta: " . $respuestas_correctas[$pregunta_id] . "<br>";

        // Comparación de respuestas
        if ($respuesta_usuario == $respuestas_correctas[$pregunta_id]) {
            $respuestas_correctas_usuario++;
        }
    }
}

// Retornar los resultados
echo json_encode([
    'total' => $total_respuestas,
    'correctas' => $respuestas_correctas_usuario
]);

?>
