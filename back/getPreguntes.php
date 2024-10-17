<?php
session_start();
header('Content-Type: application/json');

include 'db.php'; 

$cantidad = isset($_GET['cantidad']) ? $_GET['cantidad'] : 10; 

$sql = "SELECT * FROM preguntas ORDER BY RAND() LIMIT $cantidad";
$result = $conn->query($sql);

$preguntas_array = []; 
$respuestas_correctas = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $pregunta_obj = new stdClass();
        $pregunta_obj->id = $row['id'];
        $pregunta_obj->pregunta = $row['pregunta'];
        $respostes = [];
        for ($i = 0; $i <=2; $i++) {
            $respostes[] = $row['respuesta_' . $i];
        }
        $pregunta_obj->respostes = $respostes;
        $pregunta_obj->imatge = $row['imatge'];

        $respuestas_correctas[] = $row['respuesta_correcta'];

        array_push($preguntas_array, $pregunta_obj);
    }
}

$_SESSION['respuestas_correctas'] = $respuestas_correctas;

echo json_encode($preguntas_array);

$conn->close(); 
?>
