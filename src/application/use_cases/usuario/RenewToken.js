const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRES_IN } = require('../../../config/jwt.config');

module.exports = () => {
  return async (userData) => {
    const payload = {
      id: userData.id,
      email: userData.email,
    };

    const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

    return {
      token: newToken,
      user: payload
    };
  };
};