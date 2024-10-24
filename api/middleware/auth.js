const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ msg: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, 'jwtSecret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token no válido' });
    }
};

module.exports = authMiddleware;
