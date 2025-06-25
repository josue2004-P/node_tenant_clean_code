/**
 * Caso de uso para crear un nuevo usuario
 * @param {EmpresaRepository} empresaRepository - Repositorio de empresa
 * @returns {Function} - Función que acepta los datos del usuario y lo crea
 */
module.exports = (empresaRepository) => {
  return async (empresaData) => {
    return await empresaRepository.create(empresaData);
  };
};