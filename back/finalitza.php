<?php 
session_start();
header('Content-Type: application/json');

// Obtener las respuestas correctas de la sesión
$respuestas_correctas = $_SESSION['respuestas_correctas'];
$respuestas_usuario = json_decode(file_get_contents('php://input'), true);

if (!isset($respuestas_usuario['respuestas']) || !is_array($respuestas_usuario['respuestas'])) {
    echo json_encode([
        'error' => 'Las respuestas del usuario no se recibieron correctamente.'
    ]);
    exit;
}

// Obtener las respuestas enviadas por el usuario
$respuestas_usuario = $respuestas_usuario['respuestas'];
$respuestas_correctas_usuario = 0;
$total_respuestas = count($respuestas_usuario);

// Para depuración, imprime las respuestas correctas
echo "Respuestas correctas en la sesión: ";
print_r($respuestas_correctas); // Esto mostrará lo que hay en $_SESSION['respuestas_correctas']

// Comparar las respuestas
foreach ($respuestas_usuario as $pregunta_id => $respuesta_usuario) {
    // Verificar si la respuesta seleccionada es igual a la respuesta correcta
    if (isset($respuestas_correctas[$pregunta_id])) {
        echo "Pregunta ID: $pregunta_id, Respuesta usuario: $respuesta_usuario, Respuesta correcta: " . $respuestas_correctas[$pregunta_id] . "\n";
        
        if ($respuesta_usuario == $respuestas_correctas[$pregunta_id]) {
            $respuestas_correctas_usuario++;
        }
    }
}

// Devolver el total y las correctas
echo json_encode([
    'total' => $total_respuestas,
    'correctas' => $respuestas_correctas_usuario
]);
?>
