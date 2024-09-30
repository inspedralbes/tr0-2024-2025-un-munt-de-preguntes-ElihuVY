<?php
session_start();  // Iniciar la sesión para acceder a las respuestas correctas

header('Content-Type: application/json');

// Verificamos si las respuestas correctas están en la sesión
if (!isset($_SESSION['respuestas_correctas'])) {
    echo json_encode([
        'error' => 'No se encontraron respuestas correctas en la sesión.'
    ]);
    exit;
}

// Obtener las respuestas correctas desde la sesión
$respuestas_correctas = $_SESSION['respuestas_correctas'];

// Obtener las respuestas del usuario desde la entrada (POST o JSON)
$respuestas_usuario = json_decode(file_get_contents('php://input'), true);

// Verificamos si las respuestas del usuario se recibieron correctamente
if (!isset($respuestas_usuario['respuestas']) || !is_array($respuestas_usuario['respuestas'])) {
    echo json_encode([
        'error' => 'Las respuestas del usuario no se recibieron correctamente.'
    ]);
    exit;
}

$respuestas_usuario = $respuestas_usuario['respuestas'];  // Accedemos al array de respuestas

// Contador de respuestas correctas
$respuestas_correctas_usuario = 0;
$total_respuestas = count($respuestas_usuario);

// Comparamos las respuestas del usuario con las correctas usando el índice de cada pregunta
for ($i = 0; $i < $total_respuestas; $i++) {
    // Verificar si el índice de la respuesta del usuario es correcto comparado con la respuesta correcta
    if (isset($respuestas_correctas[$i]) && $respuestas_usuario[$i] == $respuestas_correctas[$i]) {
        $respuestas_correctas_usuario++;
    }
}

// Devolver el resultado: número total y número de respuestas correctas
echo json_encode([
    'total' => $total_respuestas,
    'correctas' => $respuestas_correctas_usuario
]);
?>
