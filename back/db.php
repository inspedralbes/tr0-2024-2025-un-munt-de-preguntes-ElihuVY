<?php
// Conectar a la base de datos
$host = 'localhost';
$dbname = 'a23elivalyen_database';
$user = 'a23elivalyen_root'; 
$password = 'ValdelomarYeng10'; 
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$sql = "SELECT p.id, p.pregunta, p.imatge, r.texto_respuesta, r.correcta
        FROM preguntas p
        LEFT JOIN respuestas r ON p.id = r.pregunta_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Pregunta: " . $row["pregunta"]. "<br>";
        if($row["imatge"]) {
            echo "<img src='" . $row["imatge"] . "' alt='Imagen'><br>";
        }
        // Imprimir las respuestas
        echo "Respuestas:<br>";
        echo "1. " . $row["texto_respuesta"]. " - Correcta: " . $row["correcta"]. "<br>";
        echo "<hr>"; // Separador entre preguntas
    }
} else {
    echo "No hay preguntas disponibles.";
}

$conn->close();
?>
