<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/html; charset=utf-8'); // Cambia a HTML ya que no usarás JSON
session_start();
require 'db.php'; // Conexión a la base de datos

// Verificar si se ha establecido la cantidad de preguntas
if (isset($_GET['cantidad'])) {
    $cantidad = (int)$_GET['cantidad'];
} else {
    $cantidad = 10; // Cantidad por defecto
}

// Preparar la consulta SQL
$queryPreguntas = $pdo->prepare("
    SELECT p.id AS pregunta_id, p.pregunta, p.imatge, r.id AS respuesta_id, r.texto_respuesta, r.correcta
    FROM preguntas p
    LEFT JOIN respuestas r ON p.id = r.pregunta_id
    ORDER BY RAND() 
    LIMIT :cantidad
");

// Asignar el parámetro de cantidad de forma segura
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
    $preguntas[$pregunta_id]['respostes'][] = [
        'id' => $fila['respuesta_id'],
        'texto' => $fila['texto_respuesta'],
        'correcta' => $fila['correcta'] == 1
    ];

    // Guardar la respuesta correcta
    if ($fila['correcta'] == 1) {
        $respuestas_correctas[$pregunta_id] = count($preguntas[$pregunta_id]['respostes']) - 1;
    }
}

// Guardar las respuestas correctas en la sesión
$_SESSION['respuestas_correctas'] = $respuestas_correctas;

// Imprimir las preguntas y respuestas
foreach ($preguntas as $pregunta) {
    echo "<div>";
    echo "<h3>Pregunta: " . $pregunta['pregunta'] . "</h3>";
    if (!empty($pregunta['imatge'])) {
        echo "<img src='" . $pregunta['imatge'] . "' alt='Imagen'><br>";
    }
    echo "<h4>Respuestas:</h4>";
    foreach ($pregunta['respostes'] as $respuesta) {
        echo "<p>" . $respuesta['texto'] . " - Correcta: " . ($respuesta['correcta'] ? 'Sí' : 'No') . "</p>";
    }
    echo "</div><hr>"; // Separador entre preguntas
}
?>
