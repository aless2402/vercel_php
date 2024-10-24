// Función para mostrar un mensaje de éxito y redirigir al dashboard
function showSuccessMessage(message, redirectUrl) {
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message,
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        window.location.href = redirectUrl;
    });
}

// Función para mostrar un mensaje de error
function showErrorMessage(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    });
}
