const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.authMiddleware = (req, res, next) => {
    //Extrae el token JWT del encabezado Authorization.
    const authHeader = req.header('Authorization');
    
    // Verificar si el header Authorization está presente
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Intentar reemplazar "Bearer " en caso de que el header exista
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
        //Decodifica el token para obtener el userId.
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};
