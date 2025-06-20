const redisClient = require('../../../config/redisClient');

module.exports = (empresaRepository) => {
  return async () => {
    const cacheKey = 'empresas:all';

    // Intentar leer de cache Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Cache miss: leer BD
    const empresas = await empresaRepository.getAll();

    // Guardar en cache por 60 segundos
    await redisClient.set(cacheKey, JSON.stringify(empresas), {
      EX: 60,
    });

    return empresas;
  };
};
