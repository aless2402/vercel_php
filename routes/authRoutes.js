const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config();

// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// POST /register - Registra un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).send('User already exists');

  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// POST /login - Autentica al usuario
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User does not exist');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// POST /logout - Finaliza la sesión del usuario (placeholder)
router.post('/logout', (req, res) => {
  // En una implementación típica, los JWT se manejan del lado del cliente, por lo que el logout no requiere modificar el servidor.
  // Puedes implementar invalidación de tokens con listas negras si es necesario.
  res.send('Logout successful');
});

// POST /create-token-hedera - Placeholder para creación de tokens
router.post('/create-token-hedera', authenticateToken, (req, res) => {
  // Aquí iría la lógica para crear un token en Hedera
  res.send('Token creado en Hedera');
});

// GET /list-tokens - Placeholder para listar tokens
router.get('/list-tokens', authenticateToken, (req, res) => {
  // Aquí iría la lógica para listar los tokens creados por el usuario
  res.send('Listado de tokens');
});

module.exports = router;
