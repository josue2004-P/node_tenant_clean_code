/**
 * Caso de uso para crear un nuevo usuario
 * @param {UsuarioRepository} usuarioRepository - Repositorio de usuarios
 * @returns {Function} - Función que acepta los datos del usuario y lo crea
 */
module.exports = (usuarioRepository) => {
  return async () => {
    return await usuarioRepository.findAll();
  };
};