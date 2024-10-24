<?php
session_start(); // Iniciar sesión

require '../config/config.php'; // Incluir el archivo de configuración

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Datos para enviar a la API
    $data = array('username' => $username, 'password' => $password);
    $options = array(
        'http' => array(
            'header' => "Content-Type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($data),
        ),
    );

    // Hacer la solicitud a la API
    $context = stream_context_create($options);
    $response = @file_get_contents(API_URL . 'login', false, $context);

    if ($response === FALSE) {
        echo "<script>Swal.fire('Error', 'No se pudo conectar con la API', 'error');</script>";
        die();
    }

    $result = json_decode($response, true);

    if (isset($result['msg']) && $result['msg'] === 'Inicio de sesión exitoso') {
        $_SESSION['username'] = $username;
        header('Location: ../dashboard/index.php');
        exit();
    } else {
        echo "<script>Swal.fire('Error', '{$result['msg']}', 'error');</script>";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Inicio de Sesión</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <form method="POST" action="">
        <input type="text" name="username" placeholder="Nombre de usuario" required>
        <input type="password" name="password" placeholder="Contraseña" required>
        <button type="submit">Iniciar Sesión</button>
    </form>

    <script src="/js/script.js"></script>
</body>
</html>
