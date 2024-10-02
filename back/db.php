<?php
$host = 'localhost';
$dbname = 'a23elivalyen_database';
$user = 'a23elivalyen_root'; 
$password = 'ValdelomarYeng10'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión a la base de datos: " . $e->getMessage());
}
?>
