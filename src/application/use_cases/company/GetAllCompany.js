const redisClient = require('../../../config/redisClient');

module.exports = (companyRepository) => {
  return async () => {
    const cacheKey = 'companies:all';

    // Try to get from Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      if (!parsed.length) {
        throw new Error('No companies found');
      }
      return parsed;
    }
    // Cache miss: query DB
    const companies = await companyRepository.getAll();

    // Cache result for 60 seconds
    await redisClient.set(cacheKey, JSON.stringify(companies), {
      EX: 60,
    });

    if (!companies.length) {
      throw new Error('No companies found');
    }

    return companies;
  };
};
