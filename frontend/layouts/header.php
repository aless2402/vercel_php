<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle : 'Mi Aplicación'; ?></title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>
    <header>
        <h1>Bienvenido a la Aplicación</h1>
        <nav>
            <a href="../auth/login.php">Login</a>
            <a href="../auth/register.php">Registro</a>
        </nav>
    </header>
