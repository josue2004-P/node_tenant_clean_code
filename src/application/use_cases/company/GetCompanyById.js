module.exports = (empresaRepository) => {
  return async (id) => {
    return await empresaRepository.getById(id);
  };
};