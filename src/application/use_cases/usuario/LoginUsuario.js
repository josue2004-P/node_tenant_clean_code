const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRES_IN } = require('../../../config/jwt.config');

module.exports = (usuarioRepository) => {
  return async ({ email, password }) => {
    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) throw new Error('Usuario no encontrado');

    const validPassword = await usuario.comparePassword(password);
    
    console.log(validPassword);
    if (!validPassword) throw new Error('Contraseña incorrecta');

    // Generar token
    const payload = {
      id: usuario._id,
      email: usuario.email,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

    return {
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
      },
    };
  };
};
