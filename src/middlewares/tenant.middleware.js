const connectToTenantDB = require('../database/config');
const UserModel = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const host = req.hostname; // compania1.localhost
    const tenant = host.split('.')[0]; // compania1

    const connection = await connectToTenantDB(tenant);
    req.db = connection;
    req.User = connection.model('User', UserModel);

    next();
  } catch (err) {
    next(err);
  }
};
