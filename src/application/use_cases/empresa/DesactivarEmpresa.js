module.exports = (empresaRepository) => {
  return async (id) => {
    return await empresaRepository.desactivarEmpresa(id);
  };
};
