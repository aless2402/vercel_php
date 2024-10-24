<?php
// config/config.php
require 'vendor/autoload.php'; // Asegúrate de tener el autoload de Composer

define('API_URL', 'http://localhost:3000/'); // URL de la API

// Configuración de MongoDB
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$db = $mongoClient->selectDatabase("hedera_api");

// Configuración de sesión
session_set_save_handler(
    function ($sessionId) use ($db) {
        return $db->sessions->findOne(['_id' => $sessionId]);
    },
    function ($sessionId, $data) use ($db) {
        $db->sessions->updateOne(['_id' => $sessionId], ['$set' => ['data' => $data]], ['upsert' => true]);
    },
    function ($sessionId) use ($db) {
        $db->sessions->deleteOne(['_id' => $sessionId]);
    },
    function () use ($db) {
        return [];
    },
    function ($sessionId) use ($db) {
        $sessionData = $db->sessions->findOne(['_id' => $sessionId]);
        return $sessionData ? $sessionData['data'] : '';
    },
    function ($sessionId) use ($db) {
        return time(); // Tiempo de expiración (puedes ajustar según sea necesario)
    }
);

session_start(); // Iniciar sesión

