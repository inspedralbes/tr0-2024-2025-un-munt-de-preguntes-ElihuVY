<?php
session_start();
header('Content-Type: application/json');

require 'db.php'; 

if (isset($_GET['cantidad'])) {
    $cantidad = $_GET['cantidad'];
} else {
    $cantidad = 10; 
}

$sql = "SELECT * FROM preguntas";
$result = $conn->query($sql);

$preguntas_array = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $preguntas_array= [
            'id' => $row['id'],
            'pregunta' => $row['pregunta'],
            'respostes' => [
                $row['respuesta_0'],
                $row['respuesta_1'],
                $row['respuesta_2']
            ],
            'resposta_correcta' => $row['respuesta_correcta'],
            'imatge' => $row['imatge']
        ];
    }
}

shuffle($preguntas_array); 

$preguntas_seleccionadas = array_slice($preguntas_array, 0, $cantidad);

$respuestas_correctas = [];

foreach ($preguntas_seleccionadas as &$pregunta) {
    $respuestas_correctas[] = $pregunta['resposta_correcta']; 
    unset($pregunta['resposta_correcta']); 
}

$_SESSION['respuestas_correctas'] = $respuestas_correctas;

echo json_encode($preguntas_seleccionadas);
?>
