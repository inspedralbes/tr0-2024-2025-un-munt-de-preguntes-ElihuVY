<?php
    $pregunta = file_get_contents("./data.json");
    $String = json_decode($pregunta,true);

    foreach ($String as $pregunta) {
        echo $pregunta['pregunta'] . "<br>";
    
        foreach ($pregunta['respostes'] as $index => $respuesta) {
            echo $respuesta . "<br>";
        }

        echo $pregunta['imatge'] . "<br><br>";
    }

?>