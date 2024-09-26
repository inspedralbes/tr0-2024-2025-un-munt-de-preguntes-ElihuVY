<?php
session_start();

if (isset($_GET['reiniciar'])) {
    session_destroy(); 
    header("Location: ./");
    exit(); 
}

$datos = file_get_contents("data.json");
$preguntas_array = json_decode($datos, true);

if (!isset($_SESSION['preguntas_aleatorias'])) {
    shuffle($preguntas_array); 
    $_SESSION['preguntas_aleatorias'] = array_slice($preguntas_array, 0, 10); // Guardar 10 preguntas aleatorias
    $_SESSION['indice'] = 0;
    $_SESSION['puntuacion'] = 0; 
    $_SESSION['respuestas'] = [];  
}

$indice = isset($_GET['indice']) ? intval($_GET['indice']) : $_SESSION['indice'];

if ($indice < 0 || $indice >= count($_SESSION['preguntas_aleatorias'])) {
    $indice = 0; 
}

$pregunta_actual = $_SESSION['preguntas_aleatorias'][$indice];

if (isset($_POST['respuesta'])) {
    $respuesta_usuario = intval($_POST['respuesta']);
    $respuesta_correcta = $pregunta_actual['resposta_correcta'];

    $_SESSION['respuestas'][$indice] = $respuesta_usuario;

    if ($respuesta_usuario == $respuesta_correcta) {
        echo "<p style='color: green;'>¡Correcto!</p>";
        if ($_SESSION['puntuacion'] <= 10) { 
            $_SESSION['puntuacion']++;
        }
    } else {
        echo "<p style='color: red;'>Incorrecto</p>";
    }
    $indice++;
    if ($indice >= count($_SESSION['preguntas_aleatorias'])) {
        echo "<h2>Test finalizado. Tu puntuación es: " . $_SESSION['puntuacion'] . "/10</h2>";
        echo '<button><a href="?reiniciar=true">Reiniciar preguntas</a></button>';
        exit();
    }
}

echo "<h3>Pregunta " . ($indice + 1) . " de 10</h3>"; 
echo "<strong>" . $pregunta_actual['pregunta'] . "</strong><br>";
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
if ($indice < count($_SESSION['preguntas_aleatorias'])) {
    echo '<button><a href="?indice=' . $indice . '">Siguiente pregunta</a></button> ';
}

echo '<br><br>';
echo '<button><a href="?reiniciar=true">Reiniciar preguntas</a></button>';

$_SESSION['indice'] = $indice;
?>
