module.exports = {
  SECRET_KEY: process.env.JWT_SECRET || 'secreto-super-seguro',
  EXPIRES_IN: '1h',
};
