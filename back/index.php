<?php
session_start();

if (isset($_GET['reiniciar'])) {
    session_destroy(); 
    session_start(); 
}

$datos = file_get_contents("data.json");
$preguntas_array = json_decode($datos, true);

if (!isset($_SESSION['preguntas_aleatorias'])) {
    shuffle($preguntas_array); 
    $_SESSION['preguntas_aleatorias'] = array_slice($preguntas_array, 0, 10); // Guardar 10 preguntas aleatorias
    $_SESSION['indice'] = 0; 
}

$indice = isset($_GET['indice']) ? intval($_GET['indice']) : $_SESSION['indice'];

if ($indice < 0 || $indice >= count($_SESSION['preguntas_aleatorias'])) {
    $indice = 0; 
}

$pregunta_actual = $_SESSION['preguntas_aleatorias'][$indice];

if (isset($_POST['respuesta'])) {
    $respuesta_usuario = intval($_POST['respuesta']);
    $respuesta_correcta = $pregunta_actual['resposta_correcta'];

    if ($respuesta_usuario == $respuesta_correcta) {
        echo "<p style='color: green;'>¡Correcto!</p>";
    } else {
        echo "<p style='color: red;'>Incorrecto</p>";
    }
}

echo "<strong>" . $pregunta_actual['pregunta'] . $indice."</strong><br>";
echo '<img src="img/' . $pregunta_actual['imatge'] . '" style="width:200px;"><br><br>';

echo '<form method="POST">';
foreach ($pregunta_actual['respostes'] as $index => $respuesta) {
    echo '<button name="respuesta" value="' . $index . '">' . $respuesta . '</button> ';
}
echo '</form>';

echo '<br><br>';

if ($indice > 0) {
    echo '<button><a href="?indice=' . ($indice - 1) . '">Pregunta anterior</a></button> ';
}
if ($indice < count($_SESSION['preguntas_aleatorias']) - 1) {
    echo '<button><a href="?indice=' . ($indice + 1) . '">Siguiente pregunta</a></button> ';
}

echo '<br><br>';
echo '<button><a href="?reiniciar=true">Reiniciar preguntas</a></button>';

$_SESSION['indice'] = $indice;
?>
