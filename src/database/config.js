const mongoose = require('mongoose');
const connections = {};

const connectToTenantDB = async (tenant) => {
  if (connections[tenant]) return connections[tenant];

  const dbName = `tenant_${tenant}`;
  const uri = process.env.MONGO_URI.replace('/?', `/${dbName}?`);

  const conn = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connections[tenant] = conn;
  return conn;
};

module.exports = connectToTenantDB;
