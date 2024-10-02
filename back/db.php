<?php
$host = 'localhost';
$dbname = 'a23elivalyen_database';
$user = 'a23elivalyen_root'; 
$password = 'ValdelomarYeng10'; 

try {
    // Crear la conexión a la base de datos usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Manejar el error de conexión
    die('Error de conexión: ' . $e->getMessage());
}
?>
