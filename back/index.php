<?php
session_start();

if (isset($_GET['reiniciar'])) {
    session_destroy(); 
    session_start(); 
}

$datos = file_get_contents("data.json");
$String = json_decode($datos, true);
shuffle($String);
if (!isset($_SESSION['preguntas_aleatorias'])) {
    shuffle($String); // Barajar las preguntas
    $_SESSION['preguntas_aleatorias'] = array_slice($String, 0, 10); // Guardar 10 preguntas aleatorias
    $_SESSION['indice'] = 0; // Inicializar el índice
}


$indice = isset($_GET['indice']) ? intval($_GET['indice']) : $_SESSION['indice'];

if ($indice < 0 || $indice >= count($_SESSION['preguntas_aleatorias'])) {
    $indice = 0; // Volver a la primera pregunta si el índice es inválido
}

$pregunta = $_SESSION['preguntas_aleatorias'][$indice];

echo "<strong>" . $pregunta['pregunta'] . "</strong><br>";
echo '<img src="img/' . $pregunta['imatge'] . '" style="width:200px;"><br><br>';

foreach ($pregunta['respostes'] as $respuesta) {
    echo '<button>' . $respuesta . '</button> ';
}
echo '<br><br>';

if ($indice > 0) {
    echo '<button><a href="?indice=' . ($indice - 1) . '">Pregunta anterior</a></button> ';
}
if ($indice < count($_SESSION['preguntas_aleatorias']) - 1) {
    echo '<button><a href="?indice=' . ($indice + 1) . '">Siguiente pregunta</a></button> ';
}
echo '<br><br>';
echo '<button><a href="?reiniciar=true">Reiniciar preguntas</a></button>';

//guardar indice
$_SESSION['indice'] = $indice;
?>
