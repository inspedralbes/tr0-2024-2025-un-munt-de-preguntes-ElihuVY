<?php
session_start();
require 'db.php'; // Conexión a la base de datos

header('Content-Type: application/json');

if (isset($_GET['cantidad'])) {
    $cantidad = (int)$_GET['cantidad'];
} else {
    $cantidad = 10; // Cantidad por defecto
}

// Consulta para obtener preguntas con respuestas
$queryPreguntas = $pdo->prepare("
    SELECT p.id AS pregunta_id, p.pregunta, p.imatge, r.id AS respuesta_id, r.texto_respuesta, r.correcta
    FROM preguntas p
    JOIN respuestas r ON p.id = r.pregunta_id
    ORDER BY RAND() 
    LIMIT :cantidad
");
$queryPreguntas->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
$queryPreguntas->execute();
$preguntas_raw = $queryPreguntas->fetchAll(PDO::FETCH_ASSOC);

$preguntas = [];
$respuestas_correctas = [];

// Agrupar las respuestas por pregunta
foreach ($preguntas_raw as $fila) {
    $pregunta_id = $fila['pregunta_id'];

    if (!isset($preguntas[$pregunta_id])) {
        $preguntas[$pregunta_id] = [
            'id' => $pregunta_id,
            'pregunta' => $fila['pregunta'],
            'imatge' => $fila['imatge'],
            'respostes' => []
        ];
    }

    // Añadir la respuesta a la pregunta correspondiente
    $preguntas[$pregunta_id]['respostes'][] = $fila['texto_respuesta'];

    // Guardar la respuesta correcta
    if ($fila['correcta'] == 1) {
        $respuestas_correctas[$pregunta_id] = count($preguntas[$pregunta_id]['respostes']) - 1;
    }
}

$_SESSION['respuestas_correctas'] = $respuestas_correctas;

// Convertir el arreglo de preguntas en una lista numerada
$preguntas_list = array_values($preguntas);

echo json_encode($preguntas_list);
?>
