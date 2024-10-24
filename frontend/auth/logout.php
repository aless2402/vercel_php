<?php
session_start();
session_destroy();  // Destruye la sesión activa
header('Location: login.php');  // Redirige al login
exit();
?>
