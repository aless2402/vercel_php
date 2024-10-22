const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado' });
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Logout (en este caso, simplemente sería borrar el token del cliente)
exports.logout = (req, res) => {
    res.json({ message: 'Sesión finalizada' });
};
