// src/interfaces/graphql/middlewares/tenant.graphql.js

const mongoose = require('mongoose');
const connectToTenantDB = require('../../../config/database/config');

// Schemas
const EmpresaSchema = require('../../../domain/models/Empresa');
const UsuarioSchema = require('../../../domain/models/Usuario');
// Agrega más schemas aquí si lo necesitas

const globalConnections = {};

function registerModels(conn) {
  return {
    Empresa: conn.models.Empresa || conn.model('Empresa', EmpresaSchema),
    Usuario: conn.models.Usuario || conn.model('Usuario', UsuarioSchema),
    // Agrega más modelos aquí
  };
}

module.exports = async function getTenantModels(req) {
  const host = req.hostname;
  const subdominio = host.split('.')[0].toLowerCase();

  if (subdominio === 'localhost' || subdominio === 'admin') {
    if (!globalConnections.admin) {
      const uri = process.env.MONGO_URI.replace('/?', `/admin_db?`);
      const conn = await mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      globalConnections.admin = {
        conn,
        ...registerModels(conn),
      };
    }

    return globalConnections.admin;
  }

  if (globalConnections[subdominio]) {
    return globalConnections[subdominio];
  }

  // Conexión al admin para buscar la empresa
  const adminUri = process.env.MONGO_URI.replace('/?', `/admin_db?`);
  const adminConn = await mongoose.createConnection(adminUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const AdminEmpresa = adminConn.model('Empresa', EmpresaSchema);
  const empresa = await AdminEmpresa.findOne({ nombre: subdominio });

  if (!empresa) throw new Error('Empresa no encontrada');

  // Conectar al tenant
  const tenantConn = await connectToTenantDB(subdominio);
  const models = registerModels(tenantConn);

  globalConnections[subdominio] = {
    conn: tenantConn,
    ...models,
  };

  return globalConnections[subdominio];
};
