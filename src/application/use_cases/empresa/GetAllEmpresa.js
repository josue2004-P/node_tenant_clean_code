/**
 * Caso de uso para obtener todas las empresas
 * @param {EmpresaRepository} empresaRepository
 * @returns {Function} función que devuelve todas las empresas
 */
module.exports = (empresaRepository) => {
  return async () => {
    return await empresaRepository.getAll();
  };
};