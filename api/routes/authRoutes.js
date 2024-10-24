const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Rutas para registro e inicio de sesión
router.post('/register', register);
router.post('/login', login);

module.exports = router;
