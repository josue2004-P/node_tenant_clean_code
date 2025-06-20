module.exports = (empresaRepository) => {
  return async (id) => {
    const empresaActualizada = await empresaRepository.activarEmpresa(id);
    return empresaActualizada !== null;
  };
};