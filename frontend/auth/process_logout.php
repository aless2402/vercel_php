<?php
session_start();
session_destroy();  // Destruir la sesión

// Incluir SweetAlert2 y la lógica para mostrar la alerta
echo "<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>";
echo "<script>
    Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Tu sesión ha sido cerrada exitosamente',
        showConfirmButton: false,
        timer: 2000
    }).then(function() {
        window.location.href = 'login.php';  // Redirigir al login después de la alerta
    });
</script>";

