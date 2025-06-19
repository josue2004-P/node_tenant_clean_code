// src/interfaces/http/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../../config/jwt.config');

module.exports = (req, res, next) => {
  // Leer el token desde el header personalizado
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado ' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // lo podrás usar como req.user.id, req.user.email, etc.
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
