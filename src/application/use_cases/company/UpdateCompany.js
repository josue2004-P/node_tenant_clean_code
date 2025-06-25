module.exports = (empresaRepository) => {
  return async (id, data) => {
    return await empresaRepository.update(id, data);
  };
};
