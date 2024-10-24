const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        user = new User({ username, password });
        await user.save();

        const payload = { userId: user.id };
        const token = jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' });

        res.status(201).json({ msg: 'Registro exitoso', token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'Credenciales incorrectas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales incorrectas' });
        }

        const payload = { userId: user.id };
        const token = jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' });

        res.json({ msg: 'Inicio de sesión exitoso', token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
};
