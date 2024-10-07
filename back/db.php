<?php
$servername = "localhost";
$username = "a23elivalyen_root"; 
$password = "ValdelomarYeng10"; 
$dbname = "a23elivalyen_database"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
